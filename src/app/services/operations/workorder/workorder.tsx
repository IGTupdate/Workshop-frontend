import {
  TWorkOrderAssign,
  TworkOrderCreate,
  TworkorderPrepare,
} from "@/app/validators/workorder";
import { apiConnector } from "../../apiConnector";
import { workOrderEndpoints } from "../../apis";
import { TWorkOrder } from "@/app/types/work-order";
import { TRampDetails } from "@/app/types/ramp";
import toast from "react-hot-toast";

const {
  GET_EMPLOYEE_WORK_STATUS,
  GET_ALL_RAMP_API,
  GET_ALL_RAMP_STATUS_API,
  RAMP_CREATE_API,
  RAMP_UPDATE_API,
  CREATE_WORK_ORDER,
  GET_ALL_WORK_ORDER,
  GET_WORK_ORDER_BY_ID,
  PREPARE_WORK_ORDER,
  ASSIGN_MECHANIC_WORKORDER,
  REMOVE_MECHANIC_WORKORDER,
  GET_PAGE_WORK_ORDER,
  WORK_ORDER_RAMP_ASSIGN,
  GET_DASHBOARD_DATA,
  GET_WORKORDER_BY_APPOINTMENT_ID,
} = workOrderEndpoints;

export const getEmployeeWorkingStatus = async (employeeRole: string) => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_EMPLOYEE_WORK_STATUS + "/" + employeeRole,
    });

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const getAllRampDetails = async () => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_ALL_RAMP_API,
    });

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const getAllRampStatus = async () => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_ALL_RAMP_STATUS_API,
    });

    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const rampCreateApi = async (data: TRampDetails) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: RAMP_CREATE_API,
      bodyData: data,
    });
    if (response.data.success) toast.success("RAMP CREATED SUCCESSFULLY");
    return response.data.data;
  } catch (err) {}
};

export const rampUpdateApi = async (data: TRampDetails) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: RAMP_UPDATE_API,
      bodyData: data,
    });
    if (response.data.success) toast.success("RAMP UPDATED SUCCESSFULLY");
    return response.data.data;
  } catch (err) {
    // Handle errors if needed
  }
};

export const assignRampInWorkOrder = async (
  workOrderId: string,
  data: { rampId: string },
) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: WORK_ORDER_RAMP_ASSIGN + "/" + workOrderId,
      bodyData: data,
    });
    // if (response.data.success) toast.success("RAMP UPDATED SUCCESSFULLY")
    return response.data.data;
  } catch (err) {
    throw err;
  }
};

export const createWorkOrder = async (data: TworkOrderCreate) => {
  try {
    console.log("data ,", data);
    const response = await apiConnector({
      method: "POST",
      url: CREATE_WORK_ORDER,
      bodyData: data,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPageWorkOrder = async (query: string = "") => {
  try {
    const respone = await apiConnector({
      method: "GET",
      url: GET_PAGE_WORK_ORDER + "?" + query,
    });
    return respone.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getWorkOrderByAppointmentId = async (id: string) => {
  try {
    const respone = await apiConnector({
      method: "GET",
      url: GET_WORKORDER_BY_APPOINTMENT_ID + "/" + id + "?populate=true",
    });
    return respone.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getWorkOrderById = async (
  workOrderId: string,
  populate: boolean = false,
): Promise<TWorkOrder | null> => {
  try {
    const respone = await apiConnector({
      method: "GET",
      url: GET_WORK_ORDER_BY_ID + "/" + workOrderId + "?populate=" + populate,
    });
    return respone.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const prepareWorkOrder = async (
  workOrderId: string,
  data: TworkorderPrepare,
) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: PREPARE_WORK_ORDER + "/" + workOrderId,
      bodyData: data,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const assignMechanicWorkorder = async (
  workOrderId: string,
  data: TWorkOrderAssign,
) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: ASSIGN_MECHANIC_WORKORDER + "/" + workOrderId,
      bodyData: data,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const removeMechanicWorkOrder = async (
  workOrderId: string,
  data: TWorkOrderAssign,
) => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: REMOVE_MECHANIC_WORKORDER + "/" + workOrderId,
      bodyData: data,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getDahsboardKanbanData = async () => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_DASHBOARD_DATA,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
