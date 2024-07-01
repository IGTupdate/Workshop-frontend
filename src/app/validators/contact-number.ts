import * as Yup from "yup";

const contactNumberValidationSchema = Yup.object({
  contactNumber: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9]+$/, "Contact number must contain only digits")
    .matches(/^\d{10}$/, "Contact number must have exactly 10 digits"),
});

export default contactNumberValidationSchema;
