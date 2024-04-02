import { appointmentEndpoints } from "../../apis";
import { apiConnector } from "../../apiConnector";
import { apiOpenConnector } from "../../apiOpenConnector";

const { GET_ALL_CALENDER } = appointmentEndpoints;

export const getAllCalender = async () => {
  try {
    console.log("fetching calender....")
    const response = await apiOpenConnector({
      method: "GET",
      url: GET_ALL_CALENDER,
    });

    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
