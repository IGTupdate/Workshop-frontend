import * as yup from "yup";

export const ServicePlanValidatorSchema = yup.object({
  name: yup.string().required(),
  description: yup.array(yup.string()).default([]),
  price: yup.number().required(),
  duration: yup.number().positive(),
  category: yup.string().required(),
  tasks: yup.array().of(yup.string()).required(),
  // parts: yup.object().optional(),
  isActive: yup.boolean().default(true),
  remarks: yup.string(),
  vehicle_type: yup.string().required(),
});

export type TServicePlanValidatorSchema = yup.InferType<
  typeof ServicePlanValidatorSchema
>;
