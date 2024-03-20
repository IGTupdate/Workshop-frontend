"use client"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface IAuthData {
    contactNumber : number,
    otp : number,
    fullName? : string,
    email? : string
}
const accessToken : string | null = typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : null;
const refreshToken : string | null = typeof window !== "undefined" ? window.localStorage.getItem("refreshToken") : null;

export interface IAuthState {
    authStep: number,
    userExists: boolean,
    authData: IAuthData | {},
    accessToken: string | null,
    refreshToken: string | null,
    authLoading: boolean
}

const initialState: IAuthState = {
    authStep: 0,
    userExists: false,
    authData: {},
    accessToken : accessToken ? JSON.parse(accessToken) : null,
    refreshToken : refreshToken ? JSON.parse(refreshToken) : null,
    authLoading : false
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
        setAuthData: (state, action: PayloadAction<IAuthState>) => {
            state.authData = action.payload
        },
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload
        },
        setRefreshToken: (state, action: PayloadAction<string | null>) => {
            state.refreshToken = action.payload 
        },
        setAuthLoading : (state, action: PayloadAction<boolean>) => {
            state.authLoading = action.payload
        }
    }
})

export const { setAuthStep, setAuthData, setAccessToken, setRefreshToken, setAuthLoading, setUserExists } = authSlice.actions
export const authReducer = authSlice.reducer