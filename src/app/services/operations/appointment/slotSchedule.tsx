import { TSlotSchedule } from "@/app/types/slot-schedule";
import { apiConnector } from "../../apiConnector";
import { appointmentEndpoints } from "../../apis";
import toast from "react-hot-toast";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import {
  setActiveSlotSchedule,
  setDeleteSlotSchedule,
  setDeleteSlotScheduleLoading,
  setSlotScheduleData,
  setSlotScheduleDataLoading,
  setSlotScheduleDrawerLoading,
} from "@/app/store/slices/slot-scheduleSlice";
import { TSlotScheduleManage } from "@/app/validators/slot-schedule";

const {
  CREATE_SLOT_SCHEDULE_API,
  GET_ALL_SLOT_SCHEDULE_API,
  GET_SLOT_SCHEDULE_API,
  DELETE_SLOT_SCHEDULE_API,
  UPDATE_SLOT_SCHEDULE_API,
} = appointmentEndpoints;

export const createSlotSchedule =
  (data: TSlotScheduleManage): ThunkAction<void, RootState, unknown, Action> =>
  async (dispatch, getState) => {
    try {
      // console.log("INSIDE API CONNECTOR")
      const response = await apiConnector({
        method: "POST",
        url: CREATE_SLOT_SCHEDULE_API,
        bodyData: data,
      });
      if (response?.data?.success) {
        toast.success(response.data.message);
      }
      toast.success(response.data.message);
      dispatch(setActiveSlotSchedule(null));
      dispatch(setSlotScheduleDataLoading(true));
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong1");
    } finally {
      dispatch(setSlotScheduleDrawerLoading(false));
    }
  };

export const updateSlotSchedule =
  (
    slotScheduleId: string,
    data: TSlotScheduleManage,
  ): ThunkAction<void, RootState, unknown, Action> =>
  async (dispatch, getState) => {
    try {
      const response = await apiConnector({
        method: "POST",
        url: UPDATE_SLOT_SCHEDULE_API + "/" + slotScheduleId,
        bodyData: data,
        params: { slotScheduleId },
      });
      toast.success(response.data.message);
      dispatch(setActiveSlotSchedule(null));
      dispatch(setSlotScheduleDataLoading(true));
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong1");
    } finally {
      dispatch(setSlotScheduleDrawerLoading(false));
    }
  };

export async function getSlotSchedule(slotScheduleId: string) {
  try {
    const getSlotScheduleResult = await apiConnector({
      method: "GET",
      url: GET_SLOT_SCHEDULE_API,
      params: { slotScheduleId },
    });
    return getSlotScheduleResult;
  } catch (err) {
    throw err;
  }
}

export const getAllSlotSchedule =
  (): ThunkAction<void, RootState, unknown, Action> =>
  async (dispatch, getState) => {
    try {
      const response = await apiConnector({
        method: "GET",
        url: GET_ALL_SLOT_SCHEDULE_API,
      });

      dispatch(setSlotScheduleData(response.data.data));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setSlotScheduleDataLoading(false));
    }
  };

export const deleteSlotScheduleById =
  (slotScheduleId: string): ThunkAction<void, RootState, unknown, Action> =>
  async (dispatch, getState) => {
    try {
      const response = await apiConnector({
        method: "DELETE",
        url: DELETE_SLOT_SCHEDULE_API + "/" + slotScheduleId,
        params: { slotScheduleId },
      });
      toast.success(response.data.message);
      dispatch(setDeleteSlotSchedule(null));
      dispatch(setSlotScheduleDataLoading(true));
    } catch (err) {
      throw err;
    } finally {
      dispatch(setDeleteSlotScheduleLoading(false));
    }
  };
