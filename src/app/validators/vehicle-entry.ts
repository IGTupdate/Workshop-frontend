import moment from "moment";
import * as yup from "yup";
export const VehicleSchema = yup.object().shape({
  registrationNumber: yup.string().required("Registration number is required"),
  entryTime: yup
    .string()
    .required("Entry time is required")
    .test("is-date", "Entry time must be a valid date", (value) =>
      moment(value, moment.ISO_8601, true).isValid(),
    )
    .transform((value) => moment(value).toISOString()),
});

export type TVehicleSchema = yup.InferType<typeof VehicleSchema>;

const registrationNumberSchema = yup
  .string()
  .required("Registration number is required");

const vehicleEntryExitTimeSchema = yup
  .string()
  .required("Exit time is required");

export const VehicleExitSchema = yup.object().shape({
  registrationNumber: registrationNumberSchema,
  exitTime: vehicleEntryExitTimeSchema,
});

export type TVehicleExitSchema = yup.InferType<typeof VehicleExitSchema>;
