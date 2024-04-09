import { setAppointmentData, setAppointmentLoading } from "@/app/store/slices/customerAppointmentSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { apiConnector } from "../../apiConnector";
import { appointmentEndpoints } from "../../apis";
import toast from "react-hot-toast";
import { AppointmentData } from "@/app/dashboard/appointment/__utils/FetchAppointments";



const { GET_APPOINTMENT_BY_CALENDER, APPOINTMENT_BOOK, GET_ALL_APPOINTMENT, GET_APPOINTMENT_BOOK_INIT_DATA, GET_ALL_CUSTOMER_APPOINTMENT, GET_APPOINTMENT_BY_APPOINTMENT_ID, APPOINTMENT_CANCEL_API } = appointmentEndpoints

export const getAppointmentByCalenderId = async (calenderId: string, query:string = ""): Promise<number> => {
    try {
        const response = await apiConnector({
            method: "GET",
            url: GET_APPOINTMENT_BY_CALENDER + "/" + calenderId+"?"+query
        })

        console.log(response);
        return response.data.data.length
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getAppointmentByAppointmentId = async (appointmentId: string): Promise<AppointmentData> => {
    try {
        const response = await apiConnector({
            method: "GET",
            url: GET_APPOINTMENT_BY_APPOINTMENT_ID + "/" + appointmentId
        })

        // console.log(response);
        return response.data.data
    } catch (err) {
        // console.log(err);
        throw err;
    }
}


export const getAllAppointment = async (query: string = "") => {
    try {
        console.log("loading appointment api ", query);
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

export const getAppointMentBookInitData = async (data: any) => {
    try {

        const response = await apiConnector({
            method: "POST",
            url: GET_APPOINTMENT_BOOK_INIT_DATA,
            bodyData: data
        });

        return response.data.data

    } catch (err) {
        throw err;
    }
}

export const bookAppointment = async (data: any) => {
    try {
        const response = await apiConnector({
            method: "POST",
            url: APPOINTMENT_BOOK,
            bodyData: data
        });

        return response?.data
    } catch (err) {
        throw err;
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


export const cancelAppointment = async (appointmentId: string, dispatch: AppDispatch) => {
    try{
        const response = await apiConnector({
            method: 'POST',
            url: APPOINTMENT_CANCEL_API + '/' + appointmentId
        })

        if(response.data.success){
            dispatch(getAllCustomerAppointment())
            toast.success("Appointment Cancelled Successfulyy")
        }

    }catch(err){
        throw err
    }
}