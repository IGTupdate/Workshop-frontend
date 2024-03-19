import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({});

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
        // console.log(method, url, bodyData)
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
