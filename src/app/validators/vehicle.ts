import * as Yup from 'yup';


export const vehicleCreateSchema = Yup.object({
    registeration_number: Yup.string().required(),
    vin: Yup.string().required(),
    owner: Yup.string().optional(),
    vehicle_make: Yup.string().optional(),
    vehicle_model: Yup.string().optional(),
})

export type TvehicleCreateSchema = Yup.InferType<typeof vehicleCreateSchema>