import { NEW_SLOT_SCHEDULE } from "@/app/employee/dashboard/slot-management/slot-schedule/__utils/constant";
import { TActiveSlotSchedule, TSlotSchedule } from "@/app/types/slot-schedule";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TinitialState = {
  slotScheduleData: TSlotSchedule[];
  slotScheduleLoading: boolean;
  activeSlotSchedule: TActiveSlotSchedule;
  slotScheduleDrawerLoading: boolean;
  deleteSlotSchedule: TSlotSchedule | null;
  deleteSlotScheduleLoading: boolean;
};

const initialState: TinitialState = {
  slotScheduleData: [],
  slotScheduleLoading: true, // initial loading true if calender does not have
  activeSlotSchedule: null,
  slotScheduleDrawerLoading: false,
  deleteSlotSchedule: null,
  deleteSlotScheduleLoading: false,
};

export const slotScheduleSlice = createSlice({
  name: "slotSchedule",
  initialState,
  reducers: {
    setSlotScheduleData: (state, action: PayloadAction<TSlotSchedule[]>) => {
      state.slotScheduleData = action.payload;
      return state;
    },
    setSlotScheduleDataLoading: (state, action: PayloadAction<boolean>) => {
      state.slotScheduleLoading = action.payload;
      return state;
    },
    setActiveSlotSchedule: (
      state,
      action: PayloadAction<TActiveSlotSchedule>,
    ) => {
      state.activeSlotSchedule = action.payload;
      return state;
    },
    setSlotScheduleDrawerLoading: (state, action: PayloadAction<boolean>) => {
      state.slotScheduleDrawerLoading = action.payload;
      return state;
    },
    setDeleteSlotSchedule: (
      state,
      action: PayloadAction<TSlotSchedule | null>,
    ) => {
      state.deleteSlotSchedule = action.payload;
      return state;
    },
    setDeleteSlotScheduleLoading: (state, action: PayloadAction<boolean>) => {
      state.deleteSlotScheduleLoading = action.payload;
      return state;
    },
    resetSlotSchedule: (state) => {
      return initialState;
    },
  },
});

export const {
  setSlotScheduleData,
  setSlotScheduleDataLoading,
  setSlotScheduleDrawerLoading,
  resetSlotSchedule,
  setActiveSlotSchedule,
  setDeleteSlotSchedule,
  setDeleteSlotScheduleLoading,
} = slotScheduleSlice.actions;
export const slotScheduleReducer = slotScheduleSlice.reducer;
