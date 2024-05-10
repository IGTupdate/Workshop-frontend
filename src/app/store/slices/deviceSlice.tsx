import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IDeviceState {
  isSmallDevice: number;
  employeeSmallDevice: boolean;
}

const initialState: IDeviceState = {
  isSmallDevice: -1,
  employeeSmallDevice: false,
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setIsSmallDevice: (state, action: PayloadAction<number>) => {
      state.isSmallDevice = action.payload;
    },
    setEmployeeSmallDevice: (state, action: PayloadAction<boolean>) => {
      state.employeeSmallDevice = action.payload;
    },
  },
});

export const { setIsSmallDevice, setEmployeeSmallDevice } = deviceSlice.actions;
export const deviceReducer = deviceSlice.reducer;
