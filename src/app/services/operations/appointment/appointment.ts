import { RootState } from "@/app/store/store";
import { apiConnector } from "../../apiConnector";
import { appointmentEndpoints } from "../../apis";



const { GET_APPOINTMENT_BY_CALENDER, APPOINTMENT_BOOK, GET_ALL_APPOINTMENT, GET_APPOINTMENT_BOOK_INIT_DATA } = appointmentEndpoints

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