import { apiOpenConnector } from "../../apiOpenConnector";
import { appointmentEndpoints } from "../../apis";

const {
    GET_AVAILABLE_SLOTS_API
} = appointmentEndpoints

export async function getAvailableSlots(slotData: string | null) {
    try {
        const params = slotData ? { date: slotData } : undefined;
        const availableSlotResult = await apiOpenConnector({
            method: "POST",
            url: GET_AVAILABLE_SLOTS_API,
            params: params
        });
        return availableSlotResult;
    } catch (err) {
        throw err;
    }
}
