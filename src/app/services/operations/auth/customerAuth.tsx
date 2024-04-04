import { setAccessToken, setAuthData } from "@/app/store/slices/authSlice";
import { AppDispatch } from "@/app/store/store";
import toast from "react-hot-toast";
import { apiOpenConnector } from "../../apiOpenConnector";
import { authEndpoints } from "../../apis";
import { apiConnector } from "../../apiConnector";

const { SENDOTP_API, VERIFYOTP_API, AUTH_API, GENERATE_ACCESS_TOKEN_API, GET_CUSTOMER_DATA_API } =
  authEndpoints;

export async function getCustomerData(_id : string, dispatch : AppDispatch) {
  try{
    const result = await apiConnector({
      method: "GET",
      url: GET_CUSTOMER_DATA_API,
      params: {_id}
    })

    if(result.data.success){
      dispatch(setAuthData(result.data.data))
    }
  }catch(err){
    throw err
  }
}

export async function sendOTP(contactNumber: string) {
  try {
    // Sending OTP request
    const otpResult = await apiOpenConnector({
      method: "POST",
      url: SENDOTP_API,
      bodyData: { contactNumber },
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

export async function verifyOTP(contactNumber: string, otp: string, dispatch: AppDispatch) {
  try {
    // Sending OTP verification request
    const otpVerificationResult = await apiOpenConnector({
      method: "POST",
      url: VERIFYOTP_API,
      bodyData: { contactNumber, otp },
    });

    if (otpVerificationResult?.data?.success) {
      // If OTP verification is successful
      if (otpVerificationResult?.data?.data?.userExists) {
        // If user exists, proceed with authentication
        const authResult = await apiOpenConnector({
          method: "POST",
          url: AUTH_API,
        });

        if (authResult?.data?.success) {
          // If authentication is successful, set access token
          window.localStorage.setItem(
            "accessToken",
            authResult?.data?.accessToken
          );
          await getCustomerData(authResult.data.data._id, dispatch)
          toast.success("USER LOGGED IN SUCCESSFULLY");
        }
      } else {
        toast.success("OTP VERIFICATION SUCCESSFULL");
      }
    }

    return otpVerificationResult; // Return the OTP verification result
  } catch (err) {
    // Handle errors
    // console.error("Error verifying OTP:", err);
    throw err; // Rethrow the error for the caller to handle
  }
}

export async function registerCustomer(fullName: string, email: string, dispatch: AppDispatch) {
  try {
    const authResult = await apiOpenConnector({
      method: "POST",
      url: AUTH_API,
      bodyData: {
        fullName,
        email,
      },
    });

    if (authResult?.data?.success) {
      // If authentication is successful, set access token
      window.localStorage.setItem("accessToken", authResult?.data?.accessToken);
      await getCustomerData(authResult.data.data._id, dispatch)
      toast.success("REGISTRATION SUCCESSFULL");
    }
  } catch (err) {
    toast.error("REGISTRATION FAILED");
    throw err;
  }
}

export async function generateAccessToken(dispatch : AppDispatch){
    let generateAccessTokenResult
    try {
        // console.log("INSIDE GENERATE ACCESS TOKEN")
        generateAccessTokenResult = await apiOpenConnector({method : "GET", url : GENERATE_ACCESS_TOKEN_API});
        if(generateAccessTokenResult?.data?.accessToken) {
            dispatch(setAccessToken(generateAccessTokenResult?.data?.accessToken))
            window.localStorage.setItem('accessToken', generateAccessTokenResult?.data?.accessToken);
        }
        return generateAccessTokenResult
    } catch (err) {
        if(!generateAccessTokenResult?.data.success) window.localStorage.clear()
        console.error(err);
    }
    return generateAccessTokenResult
}
