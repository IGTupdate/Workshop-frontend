import { apiConnector } from "../../apiConnector";
import { appointmentEndpoints } from "../../apis";

const {
    GET_ALL_APPOINTMENT_BY_CUSTOMER_ID_API
} = appointmentEndpoints

export async function getAllAppointmentByCustomerId(customerId: string, status?: string) {
    try {
        const params = status ? {customerId,status} : {customerId}
        const getAllAppointmentResult = await apiConnector({
            method: "GET",
            url: GET_ALL_APPOINTMENT_BY_CUSTOMER_ID_API,
            params: params
        })
        return getAllAppointmentResult
    } catch (err) {
        throw err;
    }
}