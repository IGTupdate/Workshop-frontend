import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface IAuthData {
    contactNumber? : string,
    otp? : string,
    fullName? : string,
    email? : string
}

export interface IAuthState {
    authStep: number,
    userExists: boolean,
    authData: IAuthData,
    authLoading: boolean,
    accessToken: string | null
}

const accessToken : string | null = typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : null;

const initialAuthData = {
    contactNumber: '',
    otp: ''
}

const initialState: IAuthState = {
    authStep: 0,
    userExists: false,
    authData: initialAuthData,
    authLoading : false,
    accessToken : accessToken
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthStep: (state, action: PayloadAction<number>) =>{
            state.authStep = action.payload
        },
        setUserExists: (state, action: PayloadAction<boolean>) => {
            state.userExists = action.payload
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
        resetAuthSlice: (state) => {
            state.authStep = initialState.authStep;
            state.userExists = initialState.userExists;
            state.authData = initialState.authData;
            state.accessToken = initialState.accessToken;
            state.authLoading = initialState.authLoading;
        }
    }
})

export const { setAuthStep, setAuthData, setAuthLoading, setUserExists, resetAuthSlice } = authSlice.actions
export const authReducer = authSlice.reducer