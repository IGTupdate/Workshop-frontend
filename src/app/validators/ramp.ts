import * as Yup from 'yup';

export const TRampManageSchema = Yup.object({
    name: Yup.string().required("Ramp Name is required"),
    location: Yup.string().optional(),
    isActive: Yup.boolean().required("IsActive is required").optional(),
})

export type TRampManageSchema = Yup.InferType<typeof TRampManageSchema>