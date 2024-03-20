import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { generateAccessToken } from "./operations/auth/customerAuth";
import { useAppSelector } from "../store/reduxHooks";

const axiosInstance = axios.create({
    withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
      const accessToken = useAppSelector((state) => state.auth.accessToken)
      if (accessToken) {
        config.headers.token = accessToken;
      }else{
        await generateAccessToken()
        const newAccessToken = useAppSelector((state) => state.auth.accessToken)
        config.headers.token = newAccessToken
      }
      return config;
    },
    (error) => {
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
            method : `${method}`,
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

