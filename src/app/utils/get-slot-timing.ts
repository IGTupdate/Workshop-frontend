import { TCalender } from "../types/calender";

export const getSlotTiming = (calender: TCalender, slot_id: string) => {
    return calender.slots.find((slot, index) => {
        return slot._id === slot_id
    })
}