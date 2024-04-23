import toast from "react-hot-toast";
import { ApiConnectorParams, apiConnector } from "../../apiConnector";
import { appointmentEndpoints } from "../../apis";
import { IServiceCategory, TServicePlans } from "@/app/types/service";
import { setServicePlansData, setServicePlansLoading } from "@/app/store/slices/servicePlanSlice";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import { apiOpenConnector } from "../../apiOpenConnector";
import { getServiceCategory } from "./service-category";


const {
    CREATE_SERVICE_PLAN,
    UPDATE_SERVICE_PLAN,
    GET_SERVICE_PLAN
} = appointmentEndpoints;

export const createServicePlans = async (data: TServicePlans): Promise<void> => {
    try {
        const response = await apiConnector({
            method: "POST",
            url: CREATE_SERVICE_PLAN,
            bodyData: {
                data
            }
        });
        if (response?.data?.success) {
            toast.success(response.data.message);
        }
    } catch (err: any) {
        toast.error(err?.response?.data?.message || "Something went wrong1");
    }
};

export const updateServicePlans = async (_id: string, data: TServicePlans): Promise<void> => {
    try {
        const response = await apiConnector({
            method: "POST",
            url: `${UPDATE_SERVICE_PLAN}/${_id}`,
            bodyData: {
                data
            }
        });
        if (response?.data?.success) {
            toast.success(response.data.message);
        }
    } catch (err: any) {
        toast.error(err?.response?.data?.message || "Something went wrong1");
    }
};

export const getAllServicePlans = (): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
    try {

        const servicePlanData = await getServicePlans()

        if (servicePlanData) {
            const categories = await getServiceCategory();
            
            const segregatedData: Record<string, { category: IServiceCategory, plans: TServicePlans[] }> = {};

            // Initialize segregatedData with empty arrays for each category and include category data
            categories.forEach((category: IServiceCategory) => {
                segregatedData[category._id] = {
                    category: category,
                    plans: [],
                };
            });
        
            // Organize service plans under their respective categories
            servicePlanData.forEach((plan: TServicePlans) => {
                segregatedData[plan.category]?.plans.push(plan);
            });
        
            dispatch(setServicePlansData(segregatedData));
        }
    } catch (err) {
        console.error(err);
    } finally {
        dispatch(setServicePlansLoading(false));
    }
};

export const getServicePlans = async () => {
    try{
        const response = await apiOpenConnector({  
            method: "POST",
            url: GET_SERVICE_PLAN
        });

        if(response.data.success){
            return response.data.data
        }
    }catch(err){
        console.error(err)
    }
}