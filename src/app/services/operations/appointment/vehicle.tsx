import { TvehicleCreateSchema } from "@/app/validators/vehicle";
import { apiOpenConnector } from "../../apiOpenConnector";
import { appointmentEndpoints } from "../../apis";


const { GET_VEHICLE, CREATE_VEHICLE } = appointmentEndpoints
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