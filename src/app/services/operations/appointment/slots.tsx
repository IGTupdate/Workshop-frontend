import { apiOpenConnector } from "../../apiOpenConnector";
import { appointmentEndpoints } from "../../apis";

const {
    GET_AVAILABLE_SLOTS_API
} = appointmentEndpoints

export async function getAvailableSlots(query: string = "") {
    try {
        const response = await apiOpenConnector({
            method: "GET",
            url: GET_AVAILABLE_SLOTS_API + "?date=" + query,
        });
        return response.data.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
