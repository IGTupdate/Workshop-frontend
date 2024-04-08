import { RootState } from "@/app/store/store";
import { apiConnector } from "../../apiConnector";
import { appointmentEndpoints } from "../../apis";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { setCalenderData, setCalenderLoading } from "@/app/store/slices/calenderSlice";
import { TAppointment } from "@/app/types/appointment";
const { GET_APPOINTMENT_BY_CALENDER, GET_ALL_APPOINTMENT } = appointmentEndpoints

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