import toast from "react-hot-toast";
import { apiOpenConnector } from "../../apiOpenConnector";
import { authEndpoints } from "../../apis";
import { apiConnector } from "../../apiConnector";
import { AppDispatch } from "@/app/store/store";
import { setAuthData } from "@/app/store/slices/authSlice";

const { EMPLOYEE_LOGIN_API, GET_EMPLOYEE_DATA_API, GET_ALL_EMPLOYEES } = authEndpoints;

export async function getEmployeeData(_id: string, dispatch: AppDispatch) {
  try {
    const result = await apiConnector({
      method: "GET",
      url: GET_EMPLOYEE_DATA_API + "/" + _id,
    })

    if (result.data.success) {
      const { _id, fullName, contactNumber, email, role } = result.data.data
      window.localStorage.setItem("authData", JSON.stringify(result.data.data));
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
      await getEmployeeData(authResult.data.data._id, dispatch)
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