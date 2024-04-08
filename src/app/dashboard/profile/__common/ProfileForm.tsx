import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormComponent from '../../__components/__common/FormComponent';
import { Button } from 'antd';

const ProfileForm = () => {
  // Define default values for the form fields
  const defaultValues = {
    fullName: 'Rohit Gupta',
    contactNumber: '7049761589', // Including the default contact number here
    email: 'rg640321@gmail.com',
  };

  // Define Yup schema for form validation
  const profileSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    contactNumber: Yup.string().default(defaultValues.contactNumber),
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  // Initialize react-hook-form useForm hook with Yup resolver and default values
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: defaultValues
  });

  // Handle form submission
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=' sm:w-[330px] lg:w-[380px] mx-auto flex flex-col gap-4'>
      {[
        { name: 'fullName', label: 'Full Name' },
        { name: 'contactNumber', label: 'Contact Number', disabled: true },
        { name: 'email', label: 'Email' },
      ].map(({ name, label, disabled }) => (
        <FormComponent
            key={name}
            name={name}
            label={label}
            disabled={disabled}
            control={control}
            errors={errors}
      />
      ))}

      <Button htmlType='submit' className=' custom-button mt-2'>Submit</Button>
    </form>
  );
};

export default ProfileForm;
