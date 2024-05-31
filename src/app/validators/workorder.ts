import * as Yup from "yup";

export const workOrderCreateYupSchema = Yup.object({
  appointmentId: Yup.string().required(),
  advisorId: Yup.string().required(),
});

const currentTimeString = new Date().toISOString();

export const workorderPrepareYupSchema = Yup.object({
  fuelQuantity: Yup.number()
    .min(0, "Fuel Quanity Should be number")
    .required("Fuel Quanity is required"),
  odometerReading: Yup.number().required(),
  servicePlanId: Yup.array(Yup.string().required()).default([]),
  tasks: Yup.array(
    Yup.object({
      title: Yup.string().required(),
    }),
  )
    .required()
    .default([]),
  partsRequested: Yup.array(
    Yup.object({
      partId: Yup.string().nullable().optional(),
      partName: Yup.string(),
    }),
  ),
  notes: Yup.string().optional(),
  observations: Yup.array(Yup.string()),
  estimatedCost: Yup.number().required(),
  estimatedTimeOfCompletion: Yup.string()
    .test(
      "is-greater-than-current-time",
      "Time must be greater than the current time",
      function (value) {
        if (!value) return false;
        console.log(value);
        const currentTime = new Date();
        const inputValue = new Date(value);
        const newInputValue = new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          inputValue.getHours(),
          inputValue.getMinutes(),
          inputValue.getSeconds(),
          inputValue.getMilliseconds(),
        );

        console.log(currentTime, newInputValue);
        return newInputValue.getTime() > currentTime.getTime();
      },
    )
    .required(),
});

export const workOrderAssignMechanicsYupSchema = Yup.object({
  mechanics: Yup.array(Yup.string().required()).default([]),
});

export const workOrderAdditionalWorkCreateRequest = Yup.object({
  workOrderId: Yup.string().required("Work OrderId is missing"),
  description: Yup.string().optional(),
  tasks: Yup.array(
    Yup.object({
      title: Yup.string().required("task Title is required"),
      description: Yup.string().optional(),
      critical: Yup.boolean().optional().default(false),
      partsRequired: Yup.array(
        Yup.object({
          partId: Yup.string().optional(),
          partName: Yup.string().required("Part Name is required"),
          price: Yup.number().optional(),
        }),
      ).default([]),
    }),
  ).default([]),
  estimatedCost: Yup.number()
    .required("Estimated Cost is required for the additional Work")
    .min(0, "Cost should be greater than 0"),
});

export type TWorkOrderAssign = Yup.InferType<
  typeof workOrderAssignMechanicsYupSchema
>;

export type TworkOrderCreate = Yup.InferType<typeof workOrderCreateYupSchema>;

export type TworkorderPrepare = Yup.InferType<typeof workorderPrepareYupSchema>;

export type TworkOrderAdditionalWorkCreateRequest = Yup.InferType<
  typeof workOrderAdditionalWorkCreateRequest
>;

export const WorkorderServicePlansPrepareScema = Yup.object({
  servicePlanId: Yup.array(Yup.string().required()).default([]),
  tasks: Yup.array(
    Yup.object({
      title: Yup.string().required(),
    }),
  )
    .required()
    .default([]),
  partsRequested: Yup.array(
    Yup.object({
      partId: Yup.string().nullable().optional(),
      partName: Yup.string(),
    }),
  ),
});

export type TWorkorderServicePlansPrepareScema = Yup.InferType<
  typeof WorkorderServicePlansPrepareScema
>;

export const WorkorderEstimateTimeAndCostsScema = Yup.object({
  estimatedCost: Yup.number().required(),
  estimatedTimeOfCompletion: Yup.string()
    .test(
      "is-greater-than-current-time",
      "Time must be greater than the current time",
      function (value) {
        if (!value) return false;
        const currentTime = new Date();
        const inputValue = new Date(value);
        const newInputValue = new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          inputValue.getHours(),
          inputValue.getMinutes(),
          inputValue.getSeconds(),
          inputValue.getMilliseconds(),
        );

        console.log(currentTime, newInputValue);
        return newInputValue.getTime() > currentTime.getTime();
      },
    )
    .required(),
});

export type TWorkorderEstimateTimeAndCostsScema = Yup.InferType<
  typeof WorkorderEstimateTimeAndCostsScema
>;
