import { TEmployeeStatus } from "@/app/types/employee";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthData {
  _id?: string;
  contactNumber: string;
  fullName?: string;
  email?: string;
  role?: string;
  roleId?: string;
}

export interface IAuthState {
  authStep: number;
  authData: IAuthData;
  authLoading: boolean;
  countryCode: string;
}

const initialAuthDataState: IAuthData = {
  _id: "",
  contactNumber: "",
  fullName: "",
  email: "",
  role: "",
  roleId: "",
};

const initialState: IAuthState = {
  authStep: 0,
  authData: initialAuthDataState,
  authLoading: false,
  countryCode: "+52",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStep: (state, action: PayloadAction<number>) => {
      state.authStep = action.payload;
    },
    setAuthData: (state, action: PayloadAction<IAuthData>) => {
      state.authData = action.payload;
    },
    setAuthCountryCode: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload;
    },
    resetAuthSlice: (state) => {
      state.authStep = initialState.authStep;
      state.authLoading = initialState.authLoading;
    },
    logOut: (state) => {
      window.localStorage.clear();
      state.authData = initialState.authData;
      resetAuthSlice();
    },
  },
});

export const {
  setAuthStep,
  setAuthData,
  setAuthCountryCode,
  setAuthLoading,
  resetAuthSlice,
  logOut,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
