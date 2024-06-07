import { TvehicleCreateSchema } from "@/app/validators/vehicle";
import { apiOpenConnector } from "../../apiOpenConnector";
import { appointmentEndpoints } from "../../apis";
import { apiConnector } from "../../apiConnector";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  setVehicleData,
  setVehicleLoading,
} from "@/app/store/slices/customerVehicleSlice";
import toast from "react-hot-toast";

const {
  GET_VEHICLE,
  CREATE_VEHICLE,
  GET_VEHICLE_BY_CUSTOMER_ID,
  UPDATE_VEHICLE_BY_CUSTOMER_ID,
  DELETE_VEHICLE_BY_CUSTOMER_ID,
  ADD_VEHICLE_INTO_CUSTOMER,
} = appointmentEndpoints;

export const getVehicles = async (query: string = "") => {
  try {
    const response = await apiOpenConnector({
      method: "GET",
      url: GET_VEHICLE + "?" + query,
    });

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const addCustomerIntoVehicle = async (
  vehicle_id: string,
  customer_id: string,
) => {
  try {
    const response = await apiOpenConnector({
      method: "POST",
      url: ADD_VEHICLE_INTO_CUSTOMER,
      bodyData: {
        vehicle_id,
        customer_id,
      },
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const getVehicleByCustomerId =
  (): ThunkAction<void, RootState, unknown, Action> =>
  async (dispatch, getState) => {
    try {
      const _id = getState().auth.authData._id;
      const response = await apiConnector({
        method: "GET",
        url: GET_VEHICLE_BY_CUSTOMER_ID + "/" + _id,
      });

      dispatch(setVehicleData(response.data.data));
      return response.data.data;
    } catch (err) {
      return null;
    } finally {
      dispatch(setVehicleLoading(false));
    }
  };

export const createVehicle = async (data: TvehicleCreateSchema) => {
  try {
    const response = await apiOpenConnector({
      method: "POST",
      url: CREATE_VEHICLE,
      bodyData: data,
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const updateVehicle = async (
  query: string,
  data: TvehicleCreateSchema,
) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: UPDATE_VEHICLE_BY_CUSTOMER_ID + "/" + query,
      bodyData: data,
    });
    if (response.data.success) {
      toast.success("Vehicle Updated Successfully");
      return response.data.data;
    }
  } catch (err) {
    toast.success("Vehicle Updation Failed");
    throw err;
  }
};

export const deleteVehicle = async (query: string, customerId?: string) => {
  try {
    const response = await apiConnector({
      method: "DELETE",
      url: DELETE_VEHICLE_BY_CUSTOMER_ID + "/" + query,
      params: { customerId },
    });
    if (response.data.success) {
      toast.success("Vehicle DELETED Successfully");
    }
  } catch (err) {
    toast.success("Vehicle DELETION Failed");
    throw err;
  }
};
