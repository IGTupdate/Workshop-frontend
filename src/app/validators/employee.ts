import * as Yup from 'yup';

export const createEmployeeYupSchema = Yup.object({
    firstName: Yup.string().required("FirstName is required"),
    lastName: Yup.string().default(""),
    email: Yup.string().required("Email is Required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string().required("Password is reuqired")
});

export const updateEmployeeYupSchema = Yup.object({
    firstName: Yup.string().required("FirstName is required"),
    lastName: Yup.string().default(""),
    email: Yup.string().required("Email is Required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    role: Yup.string().required("Role is required"),
    address: Yup.string().required("Address is required")
})


export type TCreateEmployee = Yup.InferType<typeof createEmployeeYupSchema>

export type TUpdateEmpoloyee = Yup.InferType<typeof updateEmployeeYupSchema>