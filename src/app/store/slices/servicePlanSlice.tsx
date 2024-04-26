import { TSegregatedServiceData, TServicePlans } from "@/app/types/service";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IServicePlanStateData {
    servicePlansData: TServicePlans[];
    servicePlansLoading: boolean;
}

const initialState: IServicePlanStateData = {
   servicePlansData: [],
   servicePlansLoading: true
}

export const servicePlanSlice = createSlice({
    name: "servicePlan",
    initialState,
    reducers: {
        setServicePlansLoading: (state, action: PayloadAction<boolean>) => {
            state.servicePlansLoading = action.payload;
        },
        setServicePlansData: (state, action: PayloadAction<TServicePlans[]>) => {
            state.servicePlansData = action.payload;
        }
    }
});

export const {
    setServicePlansLoading,
    setServicePlansData
} = servicePlanSlice.actions;
export const servicePlanReducer = servicePlanSlice.reducer;
