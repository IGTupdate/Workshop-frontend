import * as Yup from 'yup';
import { contactNumberValidator } from '.';

const contactNumberValidationSchema = Yup.object({
    contactNumber: Yup.string().required("This is abcd")
})


export default contactNumberValidationSchema;
