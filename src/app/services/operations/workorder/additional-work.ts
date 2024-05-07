import { TworkOrderAdditionalWorkCreateRequest } from "@/app/validators/workorder";
import { apiConnector } from "../../apiConnector";
import { workOrderEndpoints } from "../../apis";

const { REQUEST_ADDITIONAL_WORK, GET_ADDITIONAL_WORK } = workOrderEndpoints;

export const requestAdditionalWork = async (
  data: TworkOrderAdditionalWorkCreateRequest,
) => {
  try {
    const respone = await apiConnector({
      method: "POST",
      url: REQUEST_ADDITIONAL_WORK,
      bodyData: data,
    });
    console.log(respone);
    return respone.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAdditionalWokrRequest = async (query: string = "") => {
  try {
    const respone = await apiConnector({
      method: "GET",
      url: GET_ADDITIONAL_WORK + "?" + query,
    });
    console.log(respone);
    return respone.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
