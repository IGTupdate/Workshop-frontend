import { setAuthData } from "@/app/store/slices/authSlice";
import { AppDispatch } from "@/app/store/store";
import toast from "react-hot-toast";
import { apiConnector } from "../../apiConnector";
import { apiOpenConnector } from "../../apiOpenConnector";
import { authEndpoints } from "../../apis";
import { getCustomerAuthInitData } from "./common";

const { EMPLOYEE_LOGIN_API, GET_EMPLOYEE_DATA_API, GET_ALL_EMPLOYEES } = authEndpoints;

export async function getEmployeeData(_id: string, dispatch: AppDispatch) {
  try {
    const result = await apiConnector({
      method: "GET",
      url: GET_EMPLOYEE_DATA_API + "/" + _id,
    })

    if (result.data.success) {
      const { _id, fullName, contactNumber, email, role } = result.data.data
      dispatch(setAuthData({ _id, fullName, contactNumber, email, role }))
    }
  } catch (err) {
    throw err
  }
}

export async function employeeLogin(email: string, password: string, dispatch: AppDispatch) {
  try {
    const authResult = await apiOpenConnector({
      method: "POST",
      url: EMPLOYEE_LOGIN_API,
      bodyData: {
        email,
        password,
      },
    });

    if (authResult?.data?.success) {
      // window.localStorage.setItem("accessToken", authResult?.data?.accessToken);
      dispatch(getCustomerAuthInitData())
      toast.success("LOGIN SUCCESSFULL");
    }
  } catch (err) {
    toast.error("LOGIN FAILED");
    throw err;
  }
}

export const getAllEmployees = async (role?: string) => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: role ? GET_ALL_EMPLOYEES + "?role=" + role : GET_ALL_EMPLOYEES,
    });

    return response.data.data;
  } catch (err) {
    throw err;
  }
}