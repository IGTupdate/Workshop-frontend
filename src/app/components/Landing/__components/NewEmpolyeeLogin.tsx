import Image from "next/image";
import React, { useState } from "react";

import { useTranslations } from "use-intl";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { setAuthLoading } from "@/app/store/slices/authSlice";
import { employeeLogin } from "@/app/services/operations/auth/employeeAuth";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

const NewEmpolyeeLogin: React.FC = () => {
  const t = useTranslations("NewEmployeeLogin");

  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { authLoading } = useAppSelector((state) => state.auth);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
    <div className="relative z-10">
      <div className="container pt-10 pb-12">
        <div className="flex justify-center xmd:justify-end">
          <div className="border-0 sm:border-[11px] rounded-2xl border-customYellow p-0 sm:p-8 w-full md:w-max">
            <h2 className="font-RobotoFlex text-customYellow font-bold text-2xl md:text-[42px] md:leading-[58.59px] text-center">
              {t("heading")}
            </h2>

            <div className="rounded-3xl transbox p-10 mt-4 shadow-bottom w-full md:w-[420px] xmd:w-[606px]">
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                {/* Email input field */}
                <div className="md:mb-4 mb-3">
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder={t("emailPlaceholder")}
                    className="w-full outline-0 border-b-2 py-2 bg-transparent text-2xl text-white"
                    required
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>

                {/* Password input field */}
                <div className="md:mb-4 mb-3">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: /^\S{8,16}$/,
                          message: "Password must be 8 to 16 characters",
                        },
                      })}
                      placeholder={t("passwordPlaceholder")}
                      className="w-full outline-0 border-b-2 py-2 bg-transparent text-2xl text-white"
                      required
                    />
                    <span
                      className="absolute right-2 bottom-3 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {/* Show/hide password button */}
                    </span>
                  </div>
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <button
                  disabled={authLoading}
                  className="mt-4 border border-customYellow rounded-full py-1 px-8 text-customYellow text-xl font-semibold hover:bg-matalicYellow hover:text-white"
                >
                  {t("button")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmpolyeeLogin;
