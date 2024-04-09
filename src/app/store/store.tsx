import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { calenderReducer } from "./slices/calenderSlice";
import { slotReducer } from "./slices/slotSlice";
import { slotScheduleReducer } from "./slices/slot-scheduleSlice";
import { deviceReducer } from "./slices/deviceSlice";
import { customerAppointmentReducer } from "./slices/customerAppointmentSlice";
import { customerVehicleReducer } from "./slices/customerVehicleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calender: calenderReducer,
    slot: slotReducer,
    slotSchedule: slotScheduleReducer,
    device: deviceReducer,
    customerAppointment: customerAppointmentReducer,
    customerVehicle: customerVehicleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
