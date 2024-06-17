import * as Yup from "yup";

export const createEmployeeYupSchema = Yup.object({
  fullName: Yup.string().required("FullName is required"),
  // lastName: Yup.string().default(""),
  email: Yup.string().required("Email is Required"),
  contactNumber: Yup.string().required("Contact Number is required"),
  roleId: Yup.string().required("Role is required"),
  password: Yup.string().required("Password is reuqired"),
});

export const updateEmployeeYupSchema = Yup.object({
  fullName: Yup.string().required("FullName is required"),
  // lastName: Yup.string().default(""),
  email: Yup.string().required("Email is Required"),
  contactNumber: Yup.string().required("Contact Number is required"),
  roleId: Yup.string().required("Role is required"),
  // address: Yup.string().required("Address is required"),
  address: Yup.string().optional(),
});

export type TCreateEmployee = Yup.InferType<typeof createEmployeeYupSchema>;

export type TUpdateEmployee = Yup.InferType<typeof updateEmployeeYupSchema>;
