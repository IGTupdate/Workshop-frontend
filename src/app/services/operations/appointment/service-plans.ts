import {
  setServicePlansData,
  setServicePlansLoading,
} from "@/app/store/slices/servicePlanSlice";
import { RootState } from "@/app/store/store";
import { TServicePlans } from "@/app/types/service";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiConnector } from "../../apiConnector";
import { apiOpenConnector } from "../../apiOpenConnector";
import { appointmentEndpoints } from "../../apis";

const { CREATE_SERVICE_PLAN, UPDATE_SERVICE_PLAN, GET_SERVICE_PLAN } =
  appointmentEndpoints;

export const createServicePlans = async (
  data: TServicePlans,
): Promise<void> => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: CREATE_SERVICE_PLAN,
      bodyData: {
        data,
      },
    });
    if (response?.data?.success) {
      toast.success(response.data.message);
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Something went wrong1");
  }
};

export const updateServicePlans = async (
  _id: string,
  data: TServicePlans,
): Promise<void> => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: `${UPDATE_SERVICE_PLAN}/${_id}`,
      bodyData: {
        data,
      },
    });
    if (response?.data?.success) {
      toast.success(response.data.message);
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Something went wrong1");
  }
};

export const getAllServicePlans =
  (): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
    try {
      const servicePlansData = await getServicePlans();
      dispatch(setServicePlansData(servicePlansData));
    } catch (err) {
    } finally {
      dispatch(setServicePlansLoading(false));
    }
  };

export const getServicePlans = async () => {
  try {
    const response = await apiOpenConnector({
      method: "POST",
      url: GET_SERVICE_PLAN,
    });

    if (response.data.success) {
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};
