"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, set, useForm } from "react-hook-form";
import * as Yup from "yup";
import FormComponent from "../../__components/__common/FormComponent";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { updateCustomer } from "@/app/services/operations/auth/customerAuth";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";

interface FormValues {
  fullName: string;
  contactNumber: string;
  email: string;
}

const ProfileForm = ({ edit, setEdit }) => {
  const authData = useAppSelector((state) => state.auth.authData);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // Define Yup schema for form validation
  const profileSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(profileSchema),
    // defaultValues,
  });

  useEffect(() => {
    setValue("fullName", authData.fullName || "");
    setValue("contactNumber", authData.contactNumber || "");
    setValue("email", authData.email || "");
  }, [edit]);
  // Initialize react-hook-form useForm hook with Yup resolver and default values

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    if (Object.keys(data).length === 0) return;
    setLoading(true);
    let newData: Partial<FormValues> = {};

    if (authData.fullName !== data.fullName) newData.fullName = data.fullName;
    if (authData.email !== data.email) newData.email = data.email;

    if (Object.keys(newData).length === 0) {
      toast.error("No Changes Found");
      setLoading(false);
      return;
    }

    dispatch(updateCustomer(newData, setLoading));

    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex flex-col gap-4 pt-8"
        >
          {[
            { name: "fullName", label: "Full Name" },
            { name: "contactNumber", label: "Contact Number", disabled: true },
            { name: "email", label: "Email" },
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
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            loading={loading}
            className="custom-button mt-2"
          >
            Submit
          </Button>
        </form>
      ) : (
        <div className="pt-8 flex flex-col justify-center h-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="icon h-[37px] w-[37px] rounded-full border flex justify-center items-center">
              <AiOutlineUser className="text-xl" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold">
                Full Name
              </label>
              <p className="font-medium capitalize text-lg">
                {authData.fullName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="icon h-[37px] w-[37px] rounded-full border flex justify-center items-center">
              <BsTelephone className="text-lg" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold">
                Contact Number
              </label>
              <p className="font-medium text-lg">{authData.contactNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="icon h-[37px] w-[37px] rounded-full border flex justify-center items-center">
              <MdOutlineMailOutline className="text-xl" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold">
                Email
              </label>
              <p className="font-medium capitalize text-lg">{authData.email}</p>
            </div>
          </div>

          {/* <Button type="primary" onClick={() => setEdit(true)} className='custom-button mt-2'>Edit</Button> */}
        </div>
      )}
    </>
  );
};

export default ProfileForm;
