import * as Yup from "yup";

export const vehicleCreateSchema = Yup.object({
  registeration_number: Yup.string()
    .required("Vehicle number is required")
    .matches(
      /^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/,
      "Vehicle number must be in the format: MP09MH2560",
    )
    .transform((value) => (value ? value.toUpperCase() : value)),
  vin: Yup.string()
    .required("VIN is required")
    .transform((value) => (value ? value.toUpperCase() : value))
    .matches(
      /^(?=.*[0-9])(?=.*[A-z])[0-9A-z-]{17}$/g,
      "VIN must be exactly 17 characters long and should not include I, O, or Q",
    ),
  owner: Yup.string().required(),
  vehicle_make: Yup.string()
    .required()
    .transform((value) => (value ? value.toUpperCase() : value)),
  vehicle_type: Yup.string().required("Please select vehicle type"),
  vehicle_model: Yup.string()
    .required()
    .transform((value) => (value ? value.toUpperCase() : value)),
  customer_id: Yup.string()
    .optional()
    .transform((value) => (value ? value.toUpperCase() : value)),
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
