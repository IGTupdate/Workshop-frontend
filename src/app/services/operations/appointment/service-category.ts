import toast from "react-hot-toast";
import { ApiConnectorParams, apiConnector } from "../../apiConnector";
import { appointmentEndpoints } from "../../apis";

const {
  CREATE_SERVICE_CATEGORY,
  UPDATE_SERVICE_CATEGORY,
  GET_SERVICE_CATEGORY,
} = appointmentEndpoints;

export const createServiceCategory = async (
  name: string,
  isActive?: boolean,
): Promise<void> => {
  try {
    const response = await apiConnector({
      method: "POST",
      url: CREATE_SERVICE_CATEGORY,
      bodyData: {
        name,
        ...(isActive !== undefined && { isActive }),
      },
    });
    if (response?.data?.success) {
      toast.success(response.data.message);
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Something went wrong1");
  }
};

export const updateServiceCategory = async (
  _id: string,
  name?: string,
  isActive?: boolean,
): Promise<void> => {
  try {
    if (!name && !isActive) {
      toast.error("NO CHANGES FOUND");
      return;
    }
    const response = await apiConnector({
      method: "POST",
      url: `${UPDATE_SERVICE_CATEGORY}/${_id}`,
      bodyData: {
        ...(name !== undefined && { name }),
        ...(isActive !== undefined && { isActive }),
      },
    });
    if (response?.data?.success) {
      toast.success(response.data.message);
    }
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Something went wrong1");
  }
};

export const getServiceCategory = async (serviceCategoryIds?: string[]) => {
  try {
    const requestOptions: ApiConnectorParams = {
      method: "POST",
      url: GET_SERVICE_CATEGORY,
    };

    if (serviceCategoryIds) {
      requestOptions.bodyData = { serviceCategoryIds };
    }

    const response = await apiConnector(requestOptions);

    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};
