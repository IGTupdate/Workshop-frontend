import { TCalender, TCalenderStatus } from "@/app/types/calender";
import { calender_status } from "./constant";

export const getAllSlotOfCalender = (calender: TCalender) => {
    return calender.slots.reduce((accumulator, currValue) => {
        return accumulator += currValue.slot_limit
    }, 0)
}

export const toogleCalenderStatus = (currentStatus: TCalenderStatus): TCalenderStatus => {
    const changeStatusTo = (currentStatus === calender_status.open) ? calender_status.close as TCalenderStatus : calender_status.open as TCalenderStatus;
    return changeStatusTo;
}