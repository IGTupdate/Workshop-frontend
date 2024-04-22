import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for the initial state
interface InitialState {
    notificationData: any[]; // Update this with the actual type of notificationData
    notificationLoading: boolean;
}

// Define the initial state
const initialState: InitialState = {
    notificationData: [],
    notificationLoading: false
};

// Define the slice
export const customerNotificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        // Action to set notification loading state
        setNotificationLoading: (state, action: PayloadAction<boolean>) => {
            state.notificationLoading = action.payload;
        },
        // Action to set notification data
        setNotificationData: (state, action: PayloadAction<any[]>) => {
            state.notificationData = action.payload;
        }
    }
});

// Export actions and reducer
export const {
    setNotificationLoading,
    setNotificationData
} = customerNotificationSlice.actions;

export const customerNotificationReducer = customerNotificationSlice.reducer;
