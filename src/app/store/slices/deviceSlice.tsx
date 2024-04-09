import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IDeviceState {
    isSmallDevice: boolean
}

const initialState: IDeviceState = {
    isSmallDevice : false
}

export const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        setIsSmallDevice: (state, action: PayloadAction<boolean>) => {
            state.isSmallDevice = action.payload
        }
    }
})

export const { setIsSmallDevice } = deviceSlice.actions
export const deviceReducer = deviceSlice.reducer
