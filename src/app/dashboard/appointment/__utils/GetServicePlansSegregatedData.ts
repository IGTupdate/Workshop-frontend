import { getServiceCategory } from "@/app/services/operations/appointment/service-category";
import {
  IServiceCategory,
  TServicePlans,
  TSegregatedServiceData,
} from "@/app/types/service";

export const getAllServicePlansCategoryWise = async (
  servicePlanData: TServicePlans[],
): Promise<TSegregatedServiceData> => {
  try {
    const categories = await getServiceCategory();

    const segregatedData: TSegregatedServiceData = {};

    // Initialize segregatedData with empty arrays for each category and include category data
    categories.forEach((category: IServiceCategory) => {
      segregatedData[category._id] = {
        category,
        plans: [],
      };
    });

    // Organize service plans under their respective categories
    servicePlanData.forEach((plan: TServicePlans) => {
      const _id = typeof plan.category === "string" ? plan.category : "";
      segregatedData[_id].plans.push(plan);
    });

    return segregatedData;
  } catch (err) {
    console.error(err);
    return {};
  }
};
