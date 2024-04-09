
import { TVehicle } from "@/app/types/vehicle";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface TCustomerVehicleState {
    vehicleData: TVehicle[] | [],
    vehicleLoading: boolean
}

const initialState: TCustomerVehicleState = {
    vehicleData: [],
    vehicleLoading: true
}

export const customerVehicleSlice = createSlice({
    name: "customerVehicle",
    initialState,
    reducers: {
        setVehicleLoading: (state, action: PayloadAction<boolean>) => {
            state.vehicleLoading = action.payload
        },
        setVehicleData: (state, action: PayloadAction<TVehicle[] | []>) => {
            state.vehicleData = action.payload
        }
    }
})

export const {
    setVehicleLoading,
    setVehicleData
} = customerVehicleSlice.actions
export const customerVehicleReducer = customerVehicleSlice.reducer