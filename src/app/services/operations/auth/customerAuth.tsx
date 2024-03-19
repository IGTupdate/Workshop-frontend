import toast from "react-hot-toast";
import { authEndpoints } from "../../apis";
import { apiConnector } from "../../apiConnector";

const {
    SENDOTP_API
} = authEndpoints;

export async function sendOTP(contactNumber: string){
    let result
    try {
        result = await apiConnector({method : "POST", url : SENDOTP_API, bodyData : {contactNumber}});
        if(result?.data?.success) toast.success("OTP SENT SUCCESSFULLY")
    } catch (err) {
        console.error(err);
        toast.error("Failed to send OTP. Please try again later.");
    }
    return result
}
