// const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = "http://localhost:4000"

// AUTH ENDPOINTS
export const authEndpoints = {
    SENDOTP_API : BASE_URL + "/customer/sendOtp",
    VERIFYOTP_API : BASE_URL + "/customer/verifyOtp",
    AUTH_API : BASE_URL + "/customer/auth",
    GENERATE_ACCESS_TOKEN_API : BASE_URL + "/auth/generateAccessToken",
    EMPLOYEE_LOGIN_API : BASE_URL + "/employee/login"
}