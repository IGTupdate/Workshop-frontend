import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { generateAccessToken } from "./operations/auth/customerAuth";
import { jwtDecode } from "jwt-decode";
import { store } from "../store/store";
// import { get_server_cookie } from "../utils/get_server_cookie";
import { get_client_cookie } from "../utils/get_client_cookie";



const axiosInstance = axios.create({
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("INSIDE INTERCEPTOR");
    let accessToken = get_client_cookie("accessToken");

    if (!accessToken) {
      // If no access token is available, generate a new one
      console.log("ACCESS a NOT FOUND")
      accessToken = await generateAccessToken(store.dispatch);
    } else {
      const currentTime = new Date().getTime();
      const decode = jwtDecode(accessToken);
      if (decode.exp && ((decode.exp * 1000) + (60 * 1000) < currentTime)) {
        // If expired, generate a new access token
        console.log("ACCESS TOKEN EXPIRED");
        accessToken = await generateAccessToken(store.dispatch);
      }
    }

    if (!accessToken) throw "";

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

interface ApiConnectorParams {
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
