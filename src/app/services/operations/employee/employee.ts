import { apiConnector } from "../../apiConnector"
import { authEndpoints } from "../../apis";

const { GET_ALL_EMPLOYEES,
    EMPLOYEE_REGISTER,
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

export const createEmployee = async () => {
    try {
        const response = await apiConnector({
            method: "POST",
            url: EMPLOYEE_REGISTER,
        })
        return response.data;
    } catch (err) {
        throw err;
    }
}