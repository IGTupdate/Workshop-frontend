import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { calenderReducer } from "./slices/calenderSlice";
import { slotReducer } from "./slices/slotSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calender: calenderReducer,
    slot: slotReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
