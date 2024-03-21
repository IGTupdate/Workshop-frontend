import toast from "react-hot-toast";
import { authEndpoints } from "../../apis";
import { apiOpenConnector } from "../../apiOpenConnector";

const {
    SENDOTP_API,
    VERIFYOTP_API,
    AUTH_API,
    GENERATE_ACCESS_TOKEN_API
} = authEndpoints;

export async function sendOTP(contactNumber: string) {
    try {
        // Sending OTP request
        const otpResult = await apiOpenConnector({
            method: "POST",
            url: SENDOTP_API,
            bodyData: { contactNumber }
        });

        if (otpResult?.data?.success) {
            // If OTP request is successful, display success message
            toast.success("OTP SENT SUCCESSFULLY");
        }

        return otpResult; // Return the OTP request result
    } catch (err) {
        // Handle errors
        // console.error("Error sending OTP:", err);
        toast.error("Failed to send OTP. Please try again later.");
        throw err; // Rethrow the error for the caller to handle
    }
}

export async function verifyOTP(contactNumber: string, otp: string) {
    try {
        // Sending OTP verification request
        const otpVerificationResult = await apiOpenConnector({
            method: "POST",
            url: VERIFYOTP_API,
            bodyData: { contactNumber, otp }
        });

        if (otpVerificationResult?.data?.success) {
            // If OTP verification is successful
            if (otpVerificationResult?.data?.data?.userExists) {
                // If user exists, proceed with authentication
                const authResult = await apiOpenConnector({
                    method: "POST",
                    url: AUTH_API
                });

                if (authResult?.data?.success) {
                    // If authentication is successful, set access token
                    window.localStorage.setItem('accessToken', authResult?.data?.accessToken);
                    toast.success("USER LOGGED IN SUCCESSFULLY");
                }
            }else{
                toast.success("OTP VERIFICATION SUCCESSFULL")
            }
        }

        return otpVerificationResult; // Return the OTP verification result
    } catch (err) {
        // Handle errors
        // console.error("Error verifying OTP:", err);
        throw err; // Rethrow the error for the caller to handle
    }
}

export async function registerCustomer(fullName : string, email : string){
    try{
        const authResult = await apiOpenConnector({
            method: "POST",
            url: AUTH_API,
            bodyData: {
                fullName,
                email
            }
        });

        if (authResult?.data?.success) {
            // If authentication is successful, set access token
            window.localStorage.setItem('accessToken', authResult?.data?.accessToken);
            toast.success("USER REGISTRATION SUCCESSFULL");
        }
    }catch(err){
        toast.error('USER REGISTRATION FAILED')
        throw err
    }
}

export async function generateAccessToken(){
    try {
        await apiOpenConnector({method : "GET", url : GENERATE_ACCESS_TOKEN_API});
    } catch (err) {
        console.error(err);
    }
}