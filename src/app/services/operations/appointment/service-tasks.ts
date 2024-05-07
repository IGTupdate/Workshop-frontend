import toast from "react-hot-toast";
import { ApiConnectorParams, apiConnector } from "../../apiConnector";
import { appointmentEndpoints } from "../../apis";

const {
  CREATE_SERVICE_TASK,
  UPDATE_SERVICE_TASK,
  GET_SERVICE_TASK,
  DELETE_SERVICE_TASK,
} = appointmentEndpoints;

export const createServiceTask = async (name: string): Promise<void> => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: CREATE_SERVICE_TASK,
      bodyData: {
        name,
      },
    });
    if (response?.data?.success) {
      toast.success(response.data.message);
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Something went wrong1");
  }
};

export const updateServiceTask = async (
  _id: string,
  name: string,
): Promise<void> => {
  try {
    if (!name) {
      toast.error("NO CHANGES FOUND");
      return;
    }

    const response = await apiConnector({
      method: "POST",
      url: `${UPDATE_SERVICE_TASK}/${_id}`,
      bodyData: {
        name,
      },
    });
    if (response?.data?.success) {
      toast.success(response.data.message);
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Something went wrong1");
  }
};

export const getServiceTasks = async (serviceTaskIds?: string[]) => {
  try {
    const requestOptions: ApiConnectorParams = {
      method: "POST",
      url: GET_SERVICE_TASK,
    };

    if (serviceTaskIds) {
      requestOptions.bodyData = { serviceTaskIds };
    }

    const response = await apiConnector(requestOptions);

    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteServiceTask = async (taskId: string[]) => {
  try {
    await apiConnector({
      method: "POST",
      url: DELETE_SERVICE_TASK + `/${taskId}`,
    });

    toast.success("Service Task Deleted Successfully");
  } catch (err) {
    console.error(err);
  }
};
