import * as Yup from 'yup';


export const slotScheduleManageSchema = Yup.object({
    name: Yup.string().required("Slot Schedule Name is required"),
    slot_details: Yup.array(Yup.object({
        start_time: Yup.object({
            hour: Yup.number().min(0).max(24).required("This is the required field"),
            minute: Yup.number().min(0).max(59).required("This is the required field"),
        }),
        end_time: Yup.object({
            hour: Yup.number().min(0).max(24).required("This is the required field"),
            minute: Yup.number().min(0).max(59).required("This is the required field"),
        }),
        slot_limit: Yup.number().min(0).required("This is the required field")
    })).required()
})

export type TSlotScheduleManage = Yup.InferType<typeof slotScheduleManageSchema>