import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOpenConnectorParams {
  method: Method;
  url: string;
  bodyData?: any;
  headers?: AxiosRequestConfig["headers"] | undefined;
  params?: AxiosRequestConfig["params"] | undefined;
}

export const apiOpenConnector = async ({
  method,
  url,
  bodyData,
  headers,
  params,
}: ApiOpenConnectorParams): Promise<AxiosResponse<any>> => {
  try {
    const response = await axiosInstance({
      method: `${method}`,
      url: `${url}`,
      data: bodyData ? bodyData : null,
      headers,
      params,
      // timeout: 5000,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
