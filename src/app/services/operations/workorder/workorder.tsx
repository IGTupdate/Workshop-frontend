import { TworkOrderCreate } from "@/app/validators/workorder";
import { apiConnector } from "../../apiConnector";
import { workOrderEndPoints } from "../../apis";

const { GET_EMPLOYEE_WORK_STATUS, CREATE_WORK_ORDER, GET_ALL_WORK_ORDER } = workOrderEndPoints;


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