import * as Yup from "yup";

export const slotScheduleManageSchema = Yup.object({
  name: Yup.string().required("Slot Schedule Name is required"),
  slot_details: Yup.array(
    Yup.object({
      start_time: Yup.object({
        hour: Yup.number()
          .transform((value, originalValue) =>
            originalValue === "" ? -1 : value,
          ) // Convert empty string to 0
          .min(0, "Must be greater than or equal to 0")
          .max(24, "Must be less than or equal to 24")
          .required("This is the required field"),
        minute: Yup.number()
          .transform((value, originalValue) =>
            originalValue === "" ? -1 : value,
          ) // Convert empty string to 0
          .min(0, "Must be greater than or equal to 0")
          .max(59, "Must be less than or equal to 59")
          .required("This is the required field"),
      }),
      end_time: Yup.object({
        hour: Yup.number()
          .transform((value, originalValue) =>
            originalValue === "" ? -1 : value,
          ) // Convert empty string to 0
          .min(0, "Must be greater than or equal to 0")
          .max(24, "Must be less than or equal to 24")
          .required("This is the required field"),
        minute: Yup.number()
          .transform((value, originalValue) =>
            originalValue === "" ? -1 : value,
          ) // Convert empty string to 0
          .min(0, "Must be greater than or equal to 0")
          .max(59, "Must be less than or equal to 59")
          .required("This is the required field"),
      }),
      slot_limit: Yup.number()
        .nullable()
        .min(0, "Must be greater than or equal to 0")
        .required("This is the required field"),
    }),
  ).required(),
});

export type TSlotScheduleManage = Yup.InferType<
  typeof slotScheduleManageSchema
>;
