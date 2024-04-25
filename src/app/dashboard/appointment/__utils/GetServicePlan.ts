import { TServicePlans } from "@/app/types/service";

export const getServicePlan = (servicePlanData: TServicePlans[], _id: string): TServicePlans | undefined => {
    try {
        // Find the first service plan that matches the _id
        return servicePlanData.find((plan: TServicePlans) => _id === plan._id);
    } catch (err) {
        console.error(err);
        return ; // Return undefined if an error occurs
    }
};
