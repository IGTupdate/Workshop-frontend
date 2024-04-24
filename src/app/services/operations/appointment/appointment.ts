import { setAppointmentData, setAppointmentLoading } from "@/app/store/slices/customerAppointmentSlice";
import { RootState } from "@/app/store/store";
import { TAppointment, TAppointmentBook, TAppointmentReschedule } from "@/app/types/appointment";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiConnector } from "../../apiConnector";
import { appointmentEndpoints } from "../../apis";



const { GET_APPOINTMENT_BY_CALENDAR, APPOINTMENT_BOOK, GET_CUSTOMER_INIT_DATA, GET_ALL_APPOINTMENT, GET_APPOINTMENT_BOOK_INIT_DATA, GET_ALL_CUSTOMER_APPOINTMENT, GET_APPOINTMENT_BY_APPOINTMENT_ID, APPOINTMENT_CANCEL_API, APPOINTMENT_RESCHEDULE_API } = appointmentEndpoints

export const getAppointmentByCalenderId = async (calenderId: string, query: string = ""): Promise<number> => {
    try {
        const response = await apiConnector({
            method: "GET",
            url: GET_APPOINTMENT_BY_CALENDAR + "/" + calenderId + "?" + query
        })

        return response.data.data.length
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getAppointmentByAppointmentId = async (appointmentId: string): Promise<TAppointment> => {
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

export const getAppointMentBookInitData = async (data: TAppointmentBook) => {
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

export const getCustomerInitData = async (customerId: string) => {
    try {

        const response = await apiConnector({
            method: "GET",
            url: GET_CUSTOMER_INIT_DATA + `/${customerId}`
        });

        if(response.data.success){
            return response.data.data.appointmentData[0]
        }
        return {}

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
        dispatch(setAppointmentLoading(true));
        const _id = getState().auth.authData._id;
        const response = await apiConnector({
            method: "GET",
            url: GET_ALL_CUSTOMER_APPOINTMENT + "/" + _id
        });
        dispatch(setAppointmentData(response.data.data));
        dispatch(setAppointmentLoading(false));
        return response.data.data;
    } catch (err) {
        dispatch(setAppointmentLoading(false));
        return null;
    } finally {
        dispatch(setAppointmentLoading(false));
    }
};


export const cancelAppointment = async (appointmentId: string) => {
    try {
        const response = await apiConnector({
            method: 'POST',
            url: APPOINTMENT_CANCEL_API + '/' + appointmentId
        })

        if (response.data.success) {
            toast.success("Appointment Cancelled Successfulyy")

        }
        return true;
    } catch (err: any) {
        toast.error(err?.response?.data?.message || COMMON_ERROR);
        throw err
    }
}

export const rescheduleAppointment = async (appointmentId: string, data: TAppointmentReschedule) => {
    try {
        // console.log(appointmentId, data)
        const response = await apiConnector({
            method: 'POST',
            url: APPOINTMENT_RESCHEDULE_API + '/' + appointmentId,
            bodyData: data
        })

        // console.log(response)
        if (response.data.success) {
            toast.success("Appointment Re-Scheduled Successfully")
        }

    } catch (err) {
        throw err
    }
}