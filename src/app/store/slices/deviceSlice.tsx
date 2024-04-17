import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IDeviceState {
    isSmallDevice: number;
}

const initialState: IDeviceState = {
    isSmallDevice: -1
};

export const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        setIsSmallDevice: (state, action: PayloadAction<number>) => {
            state.isSmallDevice = action.payload;
        }
    }
});

export const { setIsSmallDevice } = deviceSlice.actions;
export const deviceReducer = deviceSlice.reducer;
