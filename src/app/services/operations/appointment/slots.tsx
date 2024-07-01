import { apiOpenConnector } from "../../apiOpenConnector";
import { appointmentEndpoints } from "../../apis";

const { GET_AVAILABLE_SLOTS_API } = appointmentEndpoints;

export async function getAvailableSlots(query: string = "") {
  try {
    let url = GET_AVAILABLE_SLOTS_API;
    if (query) {
      url += "?date=" + query;
    }

    const response = await apiOpenConnector({
      method: "GET",
      url: url,
    });
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
