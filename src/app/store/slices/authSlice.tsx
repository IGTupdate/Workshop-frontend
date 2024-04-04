import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthData {
    _id?: string,
    contactNumber : string,
    fullName? : string,
    email? : string
}

export interface IAuthState {
    authStep: number,
    authData : IAuthData,
    authLoading: boolean,
    accessToken: string | null,
    retryCount: number
}

const accessToken : string | null = typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : null;

const initialAuthDataState: IAuthData = {
    contactNumber: ''
}

const initialState: IAuthState = {
    authStep: 0,
    authData: initialAuthDataState,
    authLoading : false,
    accessToken : accessToken,
    retryCount : 3
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthStep: (state, action: PayloadAction<number>) =>{
            state.authStep = action.payload
        },
        setAuthData: (state, action: PayloadAction<IAuthData>) => {
            state.authData = action.payload
        },
        setAuthLoading : (state, action: PayloadAction<boolean>) => {
            state.authLoading = action.payload
        },
        setAccessToken : (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
        setRetryCount : (state, action: PayloadAction<number>) => {
            state.retryCount = action.payload
        },
        resetAuthSlice: (state) => {
            state.authStep = initialState.authStep;
            state.authLoading = initialState.authLoading;
            state.retryCount = initialState.retryCount;
        },
        logOut: (state) => {
            window.localStorage.clear()
            resetAuthSlice()
            state.authData = initialState.authData;
            state.accessToken = initialState.accessToken
        }
    }
})

export const { setAuthStep, setAuthData, setAuthLoading, setRetryCount, resetAuthSlice, setAccessToken, logOut } = authSlice.actions
export const authReducer = authSlice.reducer
