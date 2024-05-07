import { logOut, setAuthData, setAuthLoading } from "@/app/store/slices/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { apiConnector } from "../../apiConnector";
import { apiOpenConnector } from "../../apiOpenConnector";
import { authEndpoints } from "../../apis";
import { getCustomerAuthInitData } from "./common";

const { SEND_OTP_API, VERIFY_OTP_API, AUTH_API, GENERATE_ACCESS_TOKEN_API, GET_CUSTOMER_DATA_API, CUSTOMER_UPDATE_API, LOGOUT_API, GET_ACCESS } =
  authEndpoints;

export async function getAccess(dispatch: AppDispatch) {
  try {
    const accessData = await apiConnector({
      method: "GET",
      url: GET_ACCESS
    });

    if (accessData.data.success) {
      dispatch(accessData.data.data);
    }
  } catch (err) { }
}


export async function getCustomerData(_id: string, dispatch: AppDispatch) {
  try {
    const result = await apiConnector({
      method: "GET",
      url: GET_CUSTOMER_DATA_API + `/${_id}`
    });

    if (result.data.success) {
      dispatch(setAuthData(result.data.data));
    }
  } catch (err) {
    throw err;
  }
}

export async function sendOTP(countryCode: string, number: string, resend?: boolean) {
  try {
    // Sending OTP request
    const otpResult = await apiOpenConnector({
      method: "POST",
      url: SEND_OTP_API,
      bodyData: { countryCode, contactNumber: number },
    });

    if (otpResult?.data?.success) {
      // If OTP request is successful, display success message
      if (resend) toast.success("OTP RE-SENT SUCCESSFULLY");
      else toast.success("OTP SENT SUCCESSFULLY");
    }

    return otpResult; // Return the OTP request result
  } catch (err) {
    // Handle errors
    // console.error("Error sending OTP:", err);
    toast.error("Failed to send OTP. Please try again later.");
    throw err; // Rethrow the error for the caller to handle
  }
}

export async function verifyOTP(countryCode: string, contactNumber: string, otp: string, dispatch: AppDispatch) {
  try {
    // console.log(VERIFY_OTP_API);
    // Sending OTP verification request
    const otpVerificationResult = await apiOpenConnector({
      method: "POST",
      url: VERIFY_OTP_API,
      bodyData: { countryCode, contactNumber, otp },
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
          dispatch(getCustomerAuthInitData());
          // await getCustomerData(authResult.data.data._id, dispatch);
          // await getAccess(dispatch)
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
      dispatch(getCustomerAuthInitData());
      // await getCustomerData(authResult.data.data._id, dispatch);
      // await getAccess(dispatch)
      toast.success("REGISTRATION SUCCESSFULL");
    }
  } catch (err) {
    toast.error("REGISTRATION FAILED");
    throw err;
  }
}

export async function generateAccessToken() {
  try {
    await apiOpenConnector({ method: "GET", url: GENERATE_ACCESS_TOKEN_API });
  } catch (err) {

    throw err;
  }
}

export const updateCustomer = (data: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setEdit: React.Dispatch<React.SetStateAction<boolean>>): ThunkAction<void, RootState, unknown, Action> => async (dispatch, getState) => {
  try {
    const authData = getState().auth.authData;
    const response = await apiConnector({ method: "POST", url: CUSTOMER_UPDATE_API + "/" + authData._id, bodyData: data });
    if (response.data.success) {
      const { fullName, email } = response.data.data;
      let newAuthData = { ...authData };
      newAuthData.fullName = fullName;
      newAuthData.email = email;
      dispatch(setAuthData(newAuthData));
      toast.success("User Updated Successfully");
      setLoading(false);
      setEdit(false);
    }
  } catch (err) {
    // console.log(err);
    toast.error("Updation Failed... Please Try Later");
    throw err;
  }
};

export const logout = (): ThunkAction<void, RootState, unknown, Action> => async (dispatch, getState) => {
  try {
    dispatch(setAuthLoading(true));
    const response = await apiOpenConnector({ method: "GET", url: LOGOUT_API });
    if (response.data.success) {
      dispatch(logOut());
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}


