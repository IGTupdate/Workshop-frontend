import { TworkOrderAdditionalWorkCreateRequest } from "@/app/validators/workorder";
import { apiConnector } from "../../apiConnector";
import { workOrderEndpoints } from "../../apis";

const {
  REQUEST_ADDITIONAL_WORK,
  GET_ADDITIONAL_WORK,
  UPDATE_ADDITIONAL_WORKS,
} = workOrderEndpoints;

export const requestAdditionalWork = async (
  data: TworkOrderAdditionalWorkCreateRequest,
) => {
  try {
    const respone = await apiConnector({
      method: "POST",
      url: REQUEST_ADDITIONAL_WORK,
      bodyData: data,
    });
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
    return respone.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const additionalWorkApprove = async (additionalId: string, data: []) => {
  try {
    const respone = await apiConnector({
      method: "POST",
      url: UPDATE_ADDITIONAL_WORKS + "/" + additionalId + "approve",
      bodyData: data,
    });
    return respone.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
