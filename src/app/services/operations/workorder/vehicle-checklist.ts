import { TvehicleCheckListCreateYupSchema } from "@/app/validators/vehicle-checklist";
import { apiConnector } from "../../apiConnector";
import { vehicleCheckListEndPoint } from "../../apis";

const {
  CREATE_VEHICLE_CHECKLIST,
  UPDATE_VEHICLE_CHECKLIST,
  DELETE_VEHICLE_CHECKLIST,
  GET_ALL_VEHICLE_CHECKLIST,
} = vehicleCheckListEndPoint;

export const createVehicleCheckList = async (
  data: TvehicleCheckListCreateYupSchema,
) => {
  try {
    const respone = await apiConnector({
      method: "POST",
      url: CREATE_VEHICLE_CHECKLIST,
      bodyData: data,
    });
    return respone.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateVehicleCheckList = async (
  vehicleCheckListId: string,
  data: TvehicleCheckListCreateYupSchema,
) => {
  try {
    const respone = await apiConnector({
      method: "POST",
      url: UPDATE_VEHICLE_CHECKLIST + "/" + vehicleCheckListId,
      bodyData: data,
    });
    return respone.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteVehicleCheckList = async (vehicleCheckListId: string) => {
  try {
    const respone = await apiConnector({
      method: "DELETE",
      url: DELETE_VEHICLE_CHECKLIST + "/" + vehicleCheckListId,
    });
    return respone.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllVehicleCheckList = async (query: string = "") => {
  try {
    const respone = await apiConnector({
      method: "GET",
      url: GET_ALL_VEHICLE_CHECKLIST + "?" + query,
    });
    return respone.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
