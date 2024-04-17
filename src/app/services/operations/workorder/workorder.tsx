import { apiConnector } from "../../apiConnector";
import { workOrderEndpoints } from "../../apis";

const { GET_EMPLOYEE_WORK_STATUS, GET_ALL_RAMP_API, GET_ALL_RAMP_STATUS_API, RAMP_CREATE_API } = workOrderEndpoints;

export const getEmployeeWorkingStatus = async (employeeRole: string) => {
    try {
        const response = await apiConnector({
            method: "GET",
            url: GET_EMPLOYEE_WORK_STATUS + "/" + employeeRole,
        })

        return response.data.data;

    } catch (err) {
        throw err;
    }
}

export const getAllRampDetails = async () => {
    try {
        const response = await apiConnector({
            method: "GET",
            url: GET_ALL_RAMP_API
        })

        return response.data.data;

    } catch (err) {
        throw err;
    }
}

export const getAllRampStatus = async () => {
    try {
        const response = await apiConnector({
            method: "GET",
            url: GET_ALL_RAMP_STATUS_API
        })

        return response.data.data;

    } catch (err) {
        throw err;
    }
}

export const rampCreateApi = async () => {
    try {
        const response = await apiConnector({
            method: "POST",
            url: RAMP_CREATE_API
        })

        return response.data.data;

    } catch (err) {
        throw err;
    }
}