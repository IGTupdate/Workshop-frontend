import Heading from "@/app/components/Heading";
import { registerCustomer } from "@/app/services/operations/auth/customerAuth";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { setAuthLoading } from "@/app/store/slices/authSlice";
import { Button, Input } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  fullName: string;
  email: string;
};

const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const t = useTranslations("Register");

  const { authLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    dispatch(setAuthLoading(true));
    try {
      await registerCustomer(data.fullName, data.email, dispatch);
      // dispatch(resetAuthSlice())
      router.push("/dashboard");
    } catch (err) {
      // console.log(error)
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <div className="w-full">
      {/* <Image src={Logo} alt='Logo' className='mb-8 w-[200px]' /> */}

      <Heading
        type="heading1"
        primary={t("heading")}
        secondary={t("subHeading")}
        primaryColor="text-black1"
      />

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        {/* input field */}
        <div className="md:mb-4 mb-3">
          <label className="text-base font-medium mb-1 block text-black1">
            {t("nameLabel")}
          </label>
          <Controller
            name="fullName"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <Input
                type="text"
                size="large"
                placeholder={t("namePlaceholder")}
                className="w-full text"
                {...field}
              />
            )}
          />
          {errors.fullName && (
            <span className="text-red-500">{errors.fullName.message}</span>
          )}
        </div>

        {/* input field */}
        <div className="md:mb-4 mb-3">
          <label className="text-base font-medium mb-1 block text-black1">
            {t("emailLabel")}
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <Input
                type="text"
                size="large"
                placeholder={t("emailPlaceholder")}
                className="w-full text"
                {...field}
              />
            )}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <Button
          // type='primary'
          loading={authLoading}
          disabled={authLoading}
          size="large"
          htmlType="submit"
          className="bg-black text-white1 font-semibold w-full border-none hover:shadow-xl"
        >
          {t("button")}
        </Button>
      </form>
    </div>
  );
};

export default Register;
