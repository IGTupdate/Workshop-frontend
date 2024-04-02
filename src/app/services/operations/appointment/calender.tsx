import { appointmentEndpoints } from "../../apis";
import { apiConnector } from "../../apiConnector";
import { apiOpenConnector } from "../../apiOpenConnector";

const { GET_ALL_CALENDER } = appointmentEndpoints;

export const getAllCalender = async () => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_ALL_CALENDER,
    });

    return response;
  } catch (err) {
    throw err;
  }
};
