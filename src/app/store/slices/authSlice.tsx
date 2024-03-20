"use client"
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
    authLoading: boolean
}

const initialAuthData = {
    contactNumber: '',
    otp: ''
}

const initialState: IAuthState = {
    authStep: 0,
    userExists: false,
    authData: initialAuthData,
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
        setAuthData: (state, action: PayloadAction<IAuthData>) => {
            state.authData = action.payload
        },
        setAuthLoading : (state, action: PayloadAction<boolean>) => {
            state.authLoading = action.payload
        },
        resetAuthSlice: (state) => {
            state.authStep = initialState.authStep;
            state.userExists = initialState.userExists;
            state.authData = initialState.authData;
            state.authLoading = initialState.authLoading;
        }
    }
})

export const { setAuthStep, setAuthData, setAuthLoading, setUserExists, resetAuthSlice } = authSlice.actions
export const authReducer = authSlice.reducer