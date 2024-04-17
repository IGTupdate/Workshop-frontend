import * as Yup from 'yup';

export const workOrderCreateYupSchema = Yup.object({
    appointmentId: Yup.string().required(),
    advisorId: Yup.string().required()
})

export type TworkOrderCreate = Yup.InferType<typeof workOrderCreateYupSchema>