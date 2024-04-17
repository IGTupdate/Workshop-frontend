import { TworkOrderCreate } from "@/app/validators/workorder";
import { apiConnector } from "../../apiConnector";
import { workOrderEndpoints } from "../../apis";

const { GET_EMPLOYEE_WORK_STATUS, GET_ALL_RAMP_API, GET_ALL_RAMP_STATUS_API, RAMP_CREATE_API, CREATE_WORK_ORDER, GET_ALL_WORK_ORDER } = workOrderEndpoints;

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
    }

}
export const createWorkOrder = async (data: TworkOrderCreate) => {
    try {
        console.log("data ,", data)
        const response = await apiConnector({
            method: "POST",
            url: CREATE_WORK_ORDER,
            bodyData: data
        })

        console.log(response);
        return response.data;

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getAllWorkOrder = async (query: string) => {
    try {
        const respone = await apiConnector({
            method: "GET",
            url: GET_ALL_WORK_ORDER + "?" + query
        })
        console.log(respone)
        return respone.data.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}