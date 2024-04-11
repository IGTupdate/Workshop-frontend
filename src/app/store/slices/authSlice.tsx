import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthData {
    _id?: string,
    contactNumber: string,
    fullName?: string,
    email?: string,
    role?: string
}

export interface IAuthState {
    authStep: number,
    authData: IAuthData,
    authLoading: boolean
}

const authDataString: string | null = typeof window !== "undefined" ? window.localStorage.getItem("authData") : null;

// Parse the JSON string to convert it into an object
const authData: IAuthData | null = authDataString ? JSON.parse(authDataString) : null;

const initialAuthDataState: IAuthData = {
    contactNumber: ''
}

const initialState: IAuthState = {
    authStep: 0,
    authData: authData ? authData : initialAuthDataState,
    authLoading: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthStep: (state, action: PayloadAction<number>) => {
            state.authStep = action.payload
        },
        setAuthData: (state, action: PayloadAction<IAuthData>) => {
            state.authData = action.payload
        },
        setAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.authLoading = action.payload
        },
        resetAuthSlice: (state) => {
            state.authStep = initialState.authStep;
            state.authLoading = initialState.authLoading;
        },
        logOut: (state) => {
            window.localStorage.clear()
            state.authData = initialState.authData;
            resetAuthSlice()
        }
    }
})

export const { setAuthStep, setAuthData, setAuthLoading, resetAuthSlice, logOut } = authSlice.actions
export const authReducer = authSlice.reducer
