'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormComponent from '../../__components/__common/FormComponent';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { updateCustomer } from '@/app/services/operations/auth/customerAuth';

interface FormValues {
  fullName?: string;
  contactNumber: string;
  email?: string;
}

const ProfileForm = () => {
  const authData = useAppSelector((state) => state.auth.authData);
  const dispatch = useAppDispatch();

  // Define default values for the form fields
  const defaultValues: FormValues = {
    fullName: authData.fullName,
    contactNumber: authData.contactNumber,
    email: authData.email,
  };

  // Define Yup schema for form validation
  const profileSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    contactNumber: Yup.string().required('Contact Number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const resolver: Resolver<FormValues> = yupResolver(profileSchema);

  // Initialize react-hook-form useForm hook with Yup resolver and default values
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver,
    defaultValues,
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    if (Object.keys(data).length === 0) return;
    let newData: Partial<FormValues> = {};

    if (authData.fullName !== data.fullName) newData.fullName = data.fullName;
    if (authData.email !== data.email) newData.email = data.email;

    if (Object.keys(newData).length === 0) return;

    dispatch(updateCustomer(newData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='sm:w-[330px] lg:w-[380px] mx-auto flex flex-col gap-4'>
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
      <Button htmlType='submit' className='custom-button mt-2'>Submit</Button>
    </form>
  );
};

export default ProfileForm;
