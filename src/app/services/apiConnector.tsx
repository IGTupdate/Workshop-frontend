import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { generateAccessToken, logout } from "./operations/auth/customerAuth";
import { get_client_cookie } from "../utils/get_client_cookie";
import { redirect } from "next/navigation";

const axiosInstance = axios.create({
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // console.log("INSIDE INTERCEPTOR");
    let accessToken = get_client_cookie("accessToken");

    if (!accessToken) {
      // If no access token is available, generate a new one
      await generateAccessToken();
      accessToken = get_client_cookie("accessToken");
    } else {
      const currentTime = new Date().getTime();
      const decode = jwtDecode(accessToken);
      if (decode.exp && ((decode.exp * 1000) + (60 * 1000) < currentTime)) {
        // If expired, generate a new access token
        await generateAccessToken();
        accessToken = get_client_cookie("accessToken");
      }
    }

    accessToken = get_client_cookie("accessToken");
    
    if (!accessToken) {
      logout()
      redirect('/')
      throw Error
    }

    // Set the authorization header with the new access token
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    // handle logout
    return Promise.reject(error);
  }
);

type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiConnectorParams {
  method: Method;
  url: string;
  bodyData?: any;
  headers?: AxiosRequestConfig["headers"] | undefined;
  params?: AxiosRequestConfig["params"] | undefined;
}

export const apiConnector = async ({
  method,
  url,
  bodyData,
  headers,
  params,
}: ApiConnectorParams): Promise<AxiosResponse<any>> => {
  try {

    const response = await axiosInstance({
      method: `${method}`,
      url: `${url}`,
      data: bodyData ? bodyData : null,
      headers,
      params,
    });
    return response;
  } catch (error) {
    throw error;
  }
};