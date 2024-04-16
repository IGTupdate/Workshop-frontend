import { apiConnector } from "../../apiConnector";
import { workOrderEndPoints } from "../../apis";

const { GET_EMPLOYEE_WORK_STATUS } = workOrderEndPoints;


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