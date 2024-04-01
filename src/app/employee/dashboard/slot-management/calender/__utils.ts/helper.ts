import { TCalender } from "@/app/types/calender";

export const getAllSlotOfCalender = (calender:TCalender)=>{
    return calender.slots.reduce((accumulator, currValue)=>{
        return accumulator += currValue.slot_limit
    },0)
}