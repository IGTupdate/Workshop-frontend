import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { calenderReducer } from "./slices/calenderSlice";
import { slotScheduleReducer } from "./slices/slot-scheduleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calender: calenderReducer,
    slotSchedule: slotScheduleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
