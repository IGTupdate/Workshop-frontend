import toast from "react-hot-toast";
import { authEndpoints } from "../../apis";
import { apiOpenConnector } from "../../apiOpenConnector";

const {
    SENDOTP_API,
    LOGIN_API,
    REGISTER_API,
    GENERATE_ACCESS_TOKEN_API
} = authEndpoints;

export async function sendOTP(contactNumber: string) {
    let result
    try {
        result = await apiOpenConnector({method : "POST", url : SENDOTP_API, bodyData : {contactNumber}});
        if(result?.data?.success) toast.success("OTP SENT SUCCESSFULLY")
    } catch (err) {
        console.error(err);
        toast.error("Failed to send OTP. Pleasge try again later.");
    }
    return result
}

export async function login(contactNumber: string, otp: string){
    let result
    try {
        result = await apiOpenConnector({method : "POST", url : LOGIN_API, bodyData : {contactNumber, otp}});
        if(result?.data?.success){
            window.localStorage.setItem('accessToken', result?.data?.accessToken)
            toast.success("USER LOGGED IN SUCCESSFULLY")
        }
    } catch (err) {
        console.error(err);
        toast.error("LOGIN FAILED");
    }
    return result
}

export async function generateAccessToken(){
    try {
        await apiOpenConnector({method : "GET", url : GENERATE_ACCESS_TOKEN_API});
    } catch (err) {
        console.error(err);
    }
}