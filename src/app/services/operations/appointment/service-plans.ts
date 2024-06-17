import {
  setServicePlansData,
  setServicePlansLoading,
} from "@/app/store/slices/servicePlanSlice";
import { RootState } from "@/app/store/store";
import { TServicePlans, TServicePlansCreate } from "@/app/types/service";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiConnector } from "../../apiConnector";
import { apiOpenConnector } from "../../apiOpenConnector";
import { appointmentEndpoints } from "../../apis";
import { TServicePlanValidatorSchema } from "@/app/validators/service-plans";

const { CREATE_SERVICE_PLAN, UPDATE_SERVICE_PLAN, GET_SERVICE_PLAN } =
  appointmentEndpoints;

export const createServicePlans = async (
  data: TServicePlanValidatorSchema,
) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: CREATE_SERVICE_PLAN,
      bodyData: data
    });
    if (response?.data?.success) {
      toast.success(response.data.message);
      return response
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
  (vehicle_id?: string): ThunkAction<void, RootState, unknown, Action> =>
  async (dispatch) => {
    dispatch(setServicePlansLoading(true));
    try {
      const servicePlansData = await getServicePlans(vehicle_id);
      dispatch(setServicePlansData(servicePlansData));
      dispatch(setServicePlansLoading(false));
    } catch (err) {
    } finally {
      dispatch(setServicePlansLoading(false));
    }
  };

export const getServicePlans = async (vehicle_id?: string) => {
  try {
    const response = await apiOpenConnector({
      method: "POST",
      url: GET_SERVICE_PLAN,
      bodyData: vehicle_id ? { vehicle_id } : {},
    });

    if (response.data.success) {
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getSingleServicePlans = async (id: string | string[]) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: GET_SERVICE_PLAN,
      bodyData: { data: id },
    });

    if (response.data.success) {
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};
