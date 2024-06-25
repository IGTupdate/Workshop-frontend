import { TCreateEmployee, TUpdateEmployee } from "@/app/validators/employee";
import { apiConnector } from "../../apiConnector";
import { authEndpoints } from "../../apis";
import toast from "react-hot-toast";

const {
  GET_ALL_EMPLOYEES,
  EMPLOYEE_REGISTER,
  GET_EMPLOYEE_DATA_API,
  GET_ALL_EMPLOYEE_ROLE,
  UPDATE_EMPLOYEE_DETAILS,
} = authEndpoints;

export const getAllEmployees = async (query: string) => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_ALL_EMPLOYEES + "?" + query,
    });

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getEmployeeByEmployeeId = async (
  id: string,
  data: string = "",
) => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_EMPLOYEE_DATA_API + "?_id=" + id,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createEmployee = async (data: TCreateEmployee) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: EMPLOYEE_REGISTER,
      bodyData: data,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getAllEmployeeRole = async () => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: GET_ALL_EMPLOYEE_ROLE,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateEmployeeDetails = async (
  employeeId: string,
  data: TUpdateEmployee,
) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: UPDATE_EMPLOYEE_DETAILS + "/" + employeeId,
      bodyData: data,
    });
    if (response.data.success) {
      toast.success("Employee Updation Successfull");
    }
    return response?.data;
  } catch (err) {
    toast.error("Employee Updation Failed");
    throw err;
  }
};
