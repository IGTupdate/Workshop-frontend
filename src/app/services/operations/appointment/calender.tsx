import { appointmentEndpoints } from "../../apis";
import { apiConnector } from "../../apiConnector";
import { apiOpenConnector } from "../../apiOpenConnector";
import { setActiveCalender, setCalenderData, setCalenderDrawerLoading, setCalenderLoading } from "@/app/store/slices/calenderSlice";
import { RootState } from "@/app/store/store";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { TCalenderCreate } from "@/app/validators/calender";
import toast from "react-hot-toast";

const { GET_ALL_CALENDER, CREATE_CALENDER } = appointmentEndpoints;

export const getAllCalender = (): ThunkAction<void, RootState, unknown, Action> => async (dispatch, getState) => {
  try {
    const response = await apiOpenConnector({
      method: "GET",
      url: GET_ALL_CALENDER,
    });

    console.log(response)

    const calenderData = response.data.data
    dispatch(setCalenderData(calenderData));
    dispatch(setCalenderLoading(false));
  } catch (err) {
    console.log(err);
  }
}


export const createCalender = (data: TCalenderCreate[]): ThunkAction<void, RootState, unknown, Action> => async (dispatch, getState) => {
  try {
    dispatch(setCalenderDrawerLoading(true));
    const response = await apiOpenConnector({
      method: "POST",
      url: CREATE_CALENDER,
      bodyData: { calender: data }
    })

    console.log("calender create response", response)
    dispatch(setActiveCalender(null));
    dispatch(setCalenderLoading(true));
    toast.success(response.data.message);
  } catch (err: any) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Something went wrong 1");
  }
  finally {
    dispatch(setCalenderDrawerLoading(false));
  }
}


// export const getAllCalender = async () => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       const response = await apiOpenConnector({
//         method: "GET",
//         url: GET_ALL_CALENDER,
//       });

//       console.log(response)

//       const calenderData = response.data.data
//       dispatch(setCalenderData(calenderData));
//       dispatch(setCalenderLoading(false));

//     } catch (err) {
//       console.log(err);
//     }
//   }
// };
