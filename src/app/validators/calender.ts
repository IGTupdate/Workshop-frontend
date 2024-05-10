import * as Yup from "yup";
import { calender_status } from "../[locale]/employee/dashboard/slot-management/calender/__utils/constant";

export const calenderCreateSchema = Yup.object({
  slot_schedule_id: Yup.string().required("Slot Schedule is required"),
  status: Yup.string().default(calender_status.open),
  date: Yup.string(),
});

export type TCalenderCreate = Yup.InferType<typeof calenderCreateSchema>;
