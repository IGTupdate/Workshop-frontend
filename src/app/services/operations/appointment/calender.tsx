import { appointmentEndpoints } from "../../apis";
import { apiConnector } from "../../apiConnector";
import {
  setActiveCalender,
  setCalenderData,
  setCalenderDrawerLoading,
  setCalenderLoading,
  setUpdateCalenderLoading,
  setUpdateStatusCalender,
} from "@/app/store/slices/calenderSlice";
import { RootState } from "@/app/store/store";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { TCalenderCreate } from "@/app/validators/calender";
import toast from "react-hot-toast";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { toogleCalenderStatus } from "@/app/employee/dashboard/slot-management/calender/__utils/helper";
import { TCalender, TCalenderStatus } from "@/app/types/calender";

const { GET_ALL_CALENDAR, CREATE_CALENDAR, UPDATE_CALENDAR_STATUS } =
  appointmentEndpoints;

export const getAllCalender =
  (): ThunkAction<void, RootState, unknown, Action> =>
  async (dispatch, getState) => {
    try {
      const response = await apiConnector({
        method: "GET",
        url: GET_ALL_CALENDAR,
      });

      const calenderData = response.data.data;
      dispatch(setCalenderData(calenderData));
      dispatch(setCalenderLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

export const createCalender =
  (data: TCalenderCreate[]): ThunkAction<void, RootState, unknown, Action> =>
  async (dispatch, getState) => {
    try {
      dispatch(setCalenderDrawerLoading(true));
      const response = await apiConnector({
        method: "POST",
        url: CREATE_CALENDAR,
        bodyData: { calender: data },
      });

      dispatch(setActiveCalender(null));
      dispatch(setCalenderLoading(true));
      toast.success(response.data.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      dispatch(setCalenderDrawerLoading(false));
    }
  };

export const udpateCalenderStatus =
  (
    calenderId: string,
    status: string,
  ): ThunkAction<void, RootState, unknown, Action> =>
  async (dispatch, getState) => {
    try {
      const response = await apiConnector({
        method: "POST",
        url: UPDATE_CALENDAR_STATUS + "/" + calenderId + "/" + status,
      });

      // dispatch()
      const currentActiveCalender = getState().calender
        .activeCalender as TCalender;
      if (currentActiveCalender) {
        // update active calender
        dispatch(
          setActiveCalender({
            ...currentActiveCalender,
            status: toogleCalenderStatus(
              currentActiveCalender.status as TCalenderStatus,
            ),
          }),
        );

        // update all calender
        const currentCalenderData = getState().calender.calenderData.map(
          (calender) => {
            if (calender._id === currentActiveCalender._id) {
              return {
                ...currentActiveCalender,
                status: toogleCalenderStatus(
                  currentActiveCalender.status as TCalenderStatus,
                ),
              };
            }
            return calender;
          },
        );

        dispatch(setCalenderData(currentCalenderData));
      }

      dispatch(setUpdateStatusCalender(null));

      toast.success(response.data.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      dispatch(setUpdateCalenderLoading(false));
    }
  };
