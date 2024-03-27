import { TSlotSchedule } from "@/app/types/slot-schedule";
import { apiConnector } from "../../apiConnector";
import { appointmentEndpoints } from "../../apis";
import toast from "react-hot-toast";


const {
    CREATE_SLOT_SCHEDULE_API,
    GET_ALL_SLOT_SCHEDULE_API,
    GET_SLOT_SCHEDULE_API,
    DELETE_SLOT_SCHEDULE_API,
    UPDATE_SLOT_SCHEDULE_API
} = appointmentEndpoints

export async function createSlotSchedule(slotScheduleData : TSlotSchedule){
    try{
        console.log("INSIDE API CONNECTOR")
        const createSlotScheduleResult = await apiConnector({
            method: "POST",
            url: CREATE_SLOT_SCHEDULE_API,
            bodyData: slotScheduleData
        })
        if(createSlotScheduleResult?.data?.success){
            toast.success("SLOT SCHEDULE CREATED SUCCESSFULLY")
        }
        return createSlotScheduleResult
    }catch(err){
        toast.error("SLOT SCHEDULE CREATION FAILED")
        throw err;
    }
}

export async function updateSlotSchedule(slotScheduleData : TSlotSchedule, slotScheduleId : string){
    try{
        const updateSlotScheduleResult = await apiConnector({
            method: "POST",
            url: UPDATE_SLOT_SCHEDULE_API,
            bodyData: slotScheduleData,
            params: {slotScheduleId}
        })
        if(updateSlotScheduleResult?.data?.success){
            toast.success("SLOT SCHEDULE UPDATED SUCCESSFULLY")
        }
        return updateSlotScheduleResult
    }catch(err){
        toast.error("SLOT SCHEDULE UPDATION FAILED")
        throw err;
    }
}

export async function getSlotSchedule(slotScheduleId : string) {
    try{
        const getSlotScheduleResult = await apiConnector({
            method : "GET",
            url : GET_SLOT_SCHEDULE_API,
            params : {slotScheduleId}
        })
        return getSlotScheduleResult
    }catch(err){
        throw err
    }
}

export async function getAllSlotSchedule() {
    try{
        const getAllSlotScheduleResult = await apiConnector({
            method : "GET",
            url : GET_ALL_SLOT_SCHEDULE_API
        })
        return getAllSlotScheduleResult
    }catch(err){
        throw err
    }
}

export async function deleteSlotSchedule(slotScheduleId : string) {
    try{
        const deleteSlotScheduleResult = await apiConnector({
            method : "DELETE",
            url : DELETE_SLOT_SCHEDULE_API,
            params : {slotScheduleId}
        })
        return deleteSlotScheduleResult
    }catch(err){
        throw err
    }
}