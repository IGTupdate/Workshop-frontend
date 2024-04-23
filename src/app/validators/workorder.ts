import * as Yup from 'yup';

export const workOrderCreateYupSchema = Yup.object({
    appointmentId: Yup.string().required(),
    advisorId: Yup.string().required()
})

const currentTimeString = new Date().toISOString();

export const workorderPrepareYupSchema = Yup.object({
    fuelQuantity: Yup.number().min(0, "Fuel Quanity Should be number").required("Fuel Quanity is required"),
    odometerReading: Yup.number().required(),
    servicePlanId: Yup.array(Yup.string().required()).default([]),
    tasks: Yup.array(Yup.object({
        title: Yup.string().required()
    })).required().default([]),
    partsRequested: Yup.array(Yup.object({
        partId: Yup.string().nullable().optional(),
        partName: Yup.string(),
    })),
    notes: Yup.string().optional(),
    observations: Yup.array(Yup.string()),
    estimatedCost: Yup.number().required(),
    estimatedTimeOfCompletion: Yup.string().test('is-greater-than-current-time',
        'Time must be greater than the current time', function (value) {
            if (!value) return false;
            const currentTime = new Date().getTime();
            const inputValue = new Date(value).getTime();
            return inputValue > currentTime;
        }).required(),
})

export type TworkOrderCreate = Yup.InferType<typeof workOrderCreateYupSchema>

export type TworkorderPrepare = Yup.InferType<typeof workorderPrepareYupSchema>