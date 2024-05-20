import * as Yup from "yup";

export const vehicleCreateSchema = Yup.object({
  registeration_number: Yup.string()
    .required("Vehicle number is required")
    .matches(
      /^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/,
      "Vehicle number must be in the format: MP09MH2560",
    ),
  vin: Yup.string()
    .required()
    .matches(
      /^[A-HJ-NPR-Z0-9]{17}$/i,
      "VIN must be exactly 17 characters long and should not include I, O, or Q",
    ),
  owner: Yup.string().required(),
  vehicle_make: Yup.string().required(),
  vehicle_model: Yup.string().required(),
  customer_id: Yup.string().optional(),
});

export const vehicleSearchSchema = Yup.object({
  registeration_number: Yup.string()
    .required("Vehicle number is required")
    .matches(
      /^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/,
      "Vehicle number must be in the format MP09MH2560",
    ),
});

export type TvehicleCreateSchema = Yup.InferType<typeof vehicleCreateSchema>;
export type TVehicleSearchSchema = Yup.InferType<typeof vehicleSearchSchema>;
