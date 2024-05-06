import { TCreateEmployee } from "@/app/validators/employee";
import { apiConnector } from "../../apiConnector"
import { authEndpoints } from "../../apis";

const { GET_ALL_EMPLOYEES,
    EMPLOYEE_REGISTER,
    GET_ALL_EMPLOYEE_ROLE
} = authEndpoints;


export const getAllEmployees = async () => {
    try {
        const response = await apiConnector({
            method: "GET",
            url: GET_ALL_EMPLOYEES,
        })

        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getEmployeeByEmployeeId = async () => {
    try {

        const response = await apiConnector({
            method: "GET",
            url: "",
        })

        return response.data;

    } catch (err) {
        throw err;
    }
}

export const createEmployee = async (data:TCreateEmployee) => {
    try {
        const response = await apiConnector({
            method: "POST",
            url: EMPLOYEE_REGISTER,
            bodyData: data
        })
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getAllEmployeeRole = async () => {
    try {
        const response = await apiConnector({
            method: "GET",
            url: GET_ALL_EMPLOYEE_ROLE,
        })
        return response.data;
    } catch (err) {
        throw err;
    }
}