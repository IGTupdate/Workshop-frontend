// const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = "http://localhost:4000"

// AUTH ENDPOINTS
export const authEndpoints = {
    SENDOTP_API : BASE_URL + "/customer/sendOtp",
    REGISTER_API : BASE_URL + "/customer/register",
    LOGIN_API : BASE_URL + "/customer/login",
    GENERATE_ACCESS_TOKEN_API : BASE_URL + "/auth/generateAccessToken",
    RESETPASSWORD_API : BASE_URL + "/auth/reset-password"
}