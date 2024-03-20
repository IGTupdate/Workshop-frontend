import * as Yup from 'yup';
import { contactNumberValidator } from '.';

const contactNumberValidationSchema = Yup.object().shape({
    contactNumber: Yup.string().required("Phone Number is Required")
        .matches(/^\d{10}$/, 'Please enter a valid phone number')
        .min(10, 'Please enter exactly 10 digits')
        .max(10, 'Please enter exactly 10 digits'),
})




export default contactNumberValidationSchema;
