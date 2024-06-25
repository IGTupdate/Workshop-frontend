import * as yup from "yup";

export const ServicePlanValidatorSchema = yup.object({
  name: yup.string().required(),
  description: yup.array(yup.string().required()).default([]),
  price: yup.number().required(),
  duration: yup.number().positive().required(),
  category: yup.string().required(),
  tasks: yup.array().of(yup.string().required()),
  // parts: yup.object().optional(),
  isActive: yup.boolean().default(true).required(),
  remarks: yup.string().required(),
  vehicle_type: yup.string().required(),
});

export type TServicePlanValidatorSchema = yup.InferType<
  typeof ServicePlanValidatorSchema
>;

export const ServiceCategorySchema = yup.object({
  name: yup.string().required(),
  isActive: yup.boolean().optional(),
  vehicle_type: yup.string().required("vehicle type is required field"),
});

export type TServiceCategorySchema = yup.InferType<
  typeof ServiceCategorySchema
>;

export const ServiceTaskValidatorSchema = yup.object({
  name: yup.string().required(),
  vehicle_type: yup.string().required("vehicle type is required field"),
  duration: yup.number().transform((value, originalValue) => {
    return typeof originalValue === "string" && originalValue.trim() === ""
      ? 0
      : value;
  }),
  cost: yup.number().transform((value, originalValue) => {
    return typeof originalValue === "string" && originalValue.trim() === ""
      ? 0
      : value;
  }),
});

export type TServiceTaskValidatorSchema = yup.InferType<
  typeof ServiceTaskValidatorSchema
>;
