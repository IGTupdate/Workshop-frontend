import { TvehicleCreateSchema } from "@/app/validators/vehicle";
import { apiOpenConnector } from "../../apiOpenConnector";
import { appointmentEndpoints } from "../../apis";
import { apiConnector } from "../../apiConnector";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/app/store/store";
import { setVehicleData, setVehicleLoading } from "@/app/store/slices/customerVehicleSlice";


const { GET_VEHICLE, CREATE_VEHICLE,GET_VEHICLE_BY_CUSTOMER_ID } = appointmentEndpoints
export const getVehicles = async (query: string = "") => {
    try {
        const response = await apiOpenConnector({
            method: "GET",
            url: GET_VEHICLE + "?" + query
        });

        return response.data.data;
    } catch (err) {
        throw err;
    }
}

export const getVehicleByCustomerId = (): ThunkAction<void, RootState, unknown, Action> => async (dispatch, getState) => {
    try {
        const _id = getState().auth.authData._id;
        const response = await apiConnector({
            method: "GET",
            url: GET_VEHICLE_BY_CUSTOMER_ID + '/' + _id
        })

        dispatch(setVehicleData(response.data.data));
        return response.data.data;
    } catch (err) {
        return null;
    } finally{
        dispatch(setVehicleLoading(false));
    }
};


export const createVehicle = async (data: TvehicleCreateSchema) => {
    try {
        const response = await apiOpenConnector({
            method: "POST",
            url: CREATE_VEHICLE,
            bodyData: data
        });
        return response.data.data;
    } catch (err) {
        throw err;
    }
}