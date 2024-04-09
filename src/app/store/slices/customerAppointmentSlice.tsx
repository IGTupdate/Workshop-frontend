import { TVehicle } from "@/app/types/vehicle";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICustomerAppointmentData {
    bookedBy: {
        role_id: string;
        user_id: string;
        role: string;
    };
    _id: string;
    vehicle_id: TVehicle;
    customer_id: string;
    calender_id: {
        _id: string;
        date: string;
        status: string;
        slots: {
            start_time: string;
            end_time: string;
            slot_limit: number;
            _id: string;
        }[];
        createdBy: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    slot_id: string;
    extensions: any[];
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ICustomerAppointmentState {
    appointmentData : ICustomerAppointmentData[] | [],
    appointmentLoading: boolean
}

const initialState: ICustomerAppointmentState = {
    appointmentData: [],
    appointmentLoading: true
}

export const customerAppointmentSlice = createSlice({
    name: "customerAppointment",
    initialState,
    reducers: {
        setAppointmentLoading: (state, action: PayloadAction<boolean>) => {
            state.appointmentLoading = action.payload
        },
        setAppointmentData: (state, action: PayloadAction<ICustomerAppointmentData[] | []>) => {
            state.appointmentData = action.payload
        }
    }
})

export const {
    setAppointmentLoading,
    setAppointmentData
} = customerAppointmentSlice.actions
export const customerAppointmentReducer = customerAppointmentSlice.reducer