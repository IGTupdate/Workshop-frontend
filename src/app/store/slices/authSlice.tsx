import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface IAuthState {
    authStep: number,
    contact: string
    authLoading: boolean,
    accessToken: string | null,
    retryCount: number,
    isEmployee: boolean
}

const accessToken : string | null = typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : null;
const isEmployee : string | null = typeof window !== "undefined" ? window.localStorage.getItem("isEmployee") : 'false';

const initialState: IAuthState = {
    authStep: 0,
    contact: '',
    authLoading : false,
    accessToken : accessToken,
    retryCount : 3,
    isEmployee : isEmployee === 'true' ? true : false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthStep: (state, action: PayloadAction<number>) =>{
            state.authStep = action.payload
        },
        setContact: (state, action: PayloadAction<string>) => {
            state.contact = action.payload
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
        setIsEmployee : (state, action: PayloadAction<boolean>) => {
            state.isEmployee = action.payload
        },
        resetAuthSlice: (state) => {
            state.authStep = initialState.authStep;
            state.contact = initialState.contact;
            state.authLoading = initialState.authLoading;
            state.retryCount = initialState.retryCount
        }
    }
})

export const { setAuthStep, setContact, setAuthLoading, setRetryCount, resetAuthSlice, setIsEmployee } = authSlice.actions
export const authReducer = authSlice.reducer