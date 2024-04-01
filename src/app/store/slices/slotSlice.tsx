import { SlotData } from "@/app/types/slot";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISlotState {
    slotData : SlotData | null
}

const initialState: ISlotState = {
    slotData : null
}

export const slotSlice = createSlice({
    name: "slot",
    initialState,
    reducers: {
        setSlotData: (state, action: PayloadAction<SlotData>) =>{
            state.slotData = action.payload
        },
    }
})

export const { setSlotData } = slotSlice.actions
export const slotReducer = slotSlice.reducer
