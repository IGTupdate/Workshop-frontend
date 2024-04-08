import { apiOpenConnector } from "../../apiOpenConnector";
import { appointmentEndpoints } from "../../apis";


const { GET_VEHICLE } = appointmentEndpoints
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