import { TSlotDetail } from "@/app/types/slot-schedule";
import { TSlotScheduleManage } from "@/app/validators/slot-schedule";

export const NEW_SLOT_SCHEDULE = "NEW_SLOT_SCHEDULE";

export const NEW_SLOT_SCHEDULE_INITIAL_DATA: TSlotScheduleManage = {
    name: "",
    slot_details: [
        {
            start_time: {
                hour: 0,
                minute: 0,
            },
            end_time: {
                hour: 0,
                minute: 0
            },
            slot_limit: 0
        }
    ]
}