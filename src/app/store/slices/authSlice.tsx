import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface IAuthData {
    contactNumber : number,
    otp : number,
    fullName? : string,
    email? : string
}
const accessToken : string | null = localStorage.getItem("accessToken")
const refreshToken : string | null = localStorage.getItem("refreshToken")

export interface IAuthState {
    authStep: number,
    userExists: boolean,
    authData: IAuthData | {},
    accessToken: string | null,
    refreshToken: string | null,
    loading: boolean
}

const initialState: IAuthState = {
    authStep: 0,
    userExists: false,
    authData: {},
    accessToken : accessToken ? JSON.parse(accessToken) : null,
    refreshToken : refreshToken ? JSON.parse(refreshToken) : null,
    loading : false
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
        setLoading : (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export const { setAuthStep, setAuthData, setAccessToken, setRefreshToken, setLoading, setUserExists } = authSlice.actions
export const authReducer = authSlice.reducer