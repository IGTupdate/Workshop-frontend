"use client";
import Heading from "@/app/components/Heading";
import { employeeLogin } from "@/app/services/operations/auth/employeeAuth";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { setAuthLoading } from "@/app/store/slices/authSlice";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type FormData = {
  email: string;
  password: string;
};

const LogIn: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { authLoading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    dispatch(setAuthLoading(true));
    try {
      await employeeLogin(data.email, data.password, dispatch);
      router.push("/employee/dashboard");
    } catch (err) {
      // console.log(error)
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <div className="w-full">
      <Heading
        type="heading1"
        primary={"Employee Login"}
        secondary={""}
        primaryColor="text-black1"
      />

      <form className="w-full md:mt-10 mt-8" onSubmit={handleSubmit(onSubmit)}>
        {/* Email input field */}
        <div className="md:mb-4 mb-3">
          <label className="text-sm font-medium mb-1 block text-black1">
            Email
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
                placeholder="Enter Email"
                className="w-full text"
                {...field}
              />
            )}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Password input field */}
        <div className="md:mb-4 mb-3">
          <label className="text-sm font-medium mb-1 block text-black1">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              pattern: {
                value: /^\S{8,16}$/,
                message: "Password must be 8 to 16 characters",
              },
            }}
            render={({ field }) => (
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  size="large"
                  placeholder="Enter Password"
                  className="w-full text"
                  {...field}
                />
                <span
                  className="absolute right-2 bottom-3 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FaEyeSlash fontSize={18} fill="#AFB2BF" />
                  ) : (
                    <FaEye fontSize={18} fill="#AFB2BF" />
                  )}
                </span>
              </div>
            )}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <Button
          loading={authLoading}
          disabled={authLoading}
          type="primary"
          size="large"
          htmlType="submit"
          className="bg-black text-white1 font-semibold w-full border-none hover:shadow-xl"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LogIn;
