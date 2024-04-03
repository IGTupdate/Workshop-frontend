import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { generateAccessToken } from "./operations/auth/customerAuth";
import { jwtDecode } from "jwt-decode";
import { store } from "../store/store";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("INSIDE INTERCEPTOR");

    // const cookieStore = cookies()
    // console.log("YES",cookieStore.getAll())
    const accessToken = store.getState().auth.accessToken
    console.log(accessToken);

    let generateAccessTokenResponse;
    if (!accessToken) {
      // If no access token is available, generate a new one
      console.log("ACCESS TOKEN NOT FOUND")
      generateAccessTokenResponse = await generateAccessToken(store.dispatch);
    } else {
      const currentTime = new Date().getTime();
      const decode = jwtDecode(accessToken);

      console.log("decode token", decode)

      // Check if decode.exp is defined and not expired
      if (decode.exp && decode.exp * 1000 < currentTime) {
        // If expired, generate a new access token
        console.log("ACCESS TOKEN EXPIRED");
        generateAccessTokenResponse = await generateAccessToken(store.dispatch);
      }
    }

    // if (
    //   !generateAccessTokenResponse ||
    //   !generateAccessTokenResponse.data.success
    // ) {
    //   window.location.href = "/";
    //   return Promise.reject();
    // }

    // Get the new access token after generation
    const newAccessToken = store.getState().auth.accessToken;

    // Set the authorization header with the new access token
    config.headers.Authorization = `Bearer ${newAccessToken}`;

    return config;
  },
  (error) => {
    console.log(error);
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
    // console.log("INSIDE AXIOS INSTANCE")
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
