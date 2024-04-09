import { setAppointmentData, setAppointmentLoading } from "@/app/store/slices/customerAppointmentSlice";
import { RootState } from "@/app/store/store";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { apiConnector } from "../../apiConnector";
import { appointmentEndpoints } from "../../apis";
const { GET_APPOINTMENT_BY_CALENDER, GET_ALL_APPOINTMENT, GET_ALL_CUSTOMER_APPOINTMENT } = appointmentEndpoints

export const getAppointmentByCalenderId = async (calenderId: string): Promise<number> => {
    try {
        const response = await apiConnector({
            method: "GET",
            url: GET_APPOINTMENT_BY_CALENDER + "/" + calenderId
        })

        console.log(response);
        return response.data.data.length
    } catch (err) {
        console.log(err);
        throw err;
    }
}


export const getAllAppointment = async (query: string = "") => {
    try {
        console.log("loading calender api ", query);
        const response = await apiConnector({
            method: "GET",
            url: GET_ALL_APPOINTMENT + "?" + query
        });

        return response.data.data 
    } catch (err) {
        console.log(err);
        return null
    }
}

export const getAllCustomerAppointment = (): ThunkAction<void, RootState, unknown, Action> => async (dispatch, getState) => {
    try {
        const _id = getState().auth.authData._id;
        const response = await apiConnector({
            method: "GET",
            url: GET_ALL_CUSTOMER_APPOINTMENT + "/" + _id
        });

        dispatch(setAppointmentData(response.data.data));
        return response.data.data;
    } catch (err) {
        return null;
    } finally{
        dispatch(setAppointmentLoading(false));
    }
};