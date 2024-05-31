"use client";
import Heading from "@/app/components/Heading";
import ErrorText from "@/app/components/Text/ErrorText";
import {
  sendOTP,
  verifyOTP,
} from "@/app/services/operations/auth/customerAuth";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import {
  resetAuthData,
  resetAuthSlice,
  setAuthLoading,
  setAuthStep,
} from "@/app/store/slices/authSlice";
import { Button } from "antd";
import { InputOTP } from "antd-input-otp";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import Logo from "../../../../public/images/logo-3.webp";
import { useTranslations } from "next-intl";
import { get_client_cookie } from "@/app/utils/get_client_cookie";

const VerifyOTP = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { authLoading, authData, countryCode } = useAppSelector(
    (state) => state.auth,
  );
  const t = useTranslations("VerifyOTP");

  const searchParams = useSearchParams();

  const { contactNumber } = authData;
  const [otpValues, setOtpValues] = useState<string[]>([]);
  const [otpErrors, setOTPErrors] = useState("");

  const handleFinish = async () => {
    const otp = otpValues.join("");
    if (!otp || otp.trim() === "") {
      setOTPErrors(t("errorOne"));
      return;
    }
    if (otp.length !== 6) {
      setOTPErrors(t("errorTwo"));
      return;
    }
    if (otp.length === 6) {
      setOTPErrors("");
    }

    dispatch(setAuthLoading(true));

    let result;
    try {
      result = await verifyOTP(countryCode, contactNumber, otp, dispatch);
      if (result.data.success) {
        if (result?.data?.data?.userExists) {
          const redirectUrl = searchParams.get("redirectUrl");
          router.push(redirectUrl || "/dashboard");
          dispatch(setAuthStep(1));
        } else dispatch(setAuthStep(2));
      }
    } catch (error) {
      toast.error("Invalid OTP");
      router.push("/login");
    } finally {
      setTimeout(() => {
        dispatch(setAuthLoading(false));
      }, 1000);
    }
  };

  const resendOTP = async () => {
    const sessionToken = get_client_cookie("sessionToken");
    if (!sessionToken) {
      dispatch(resetAuthSlice());
      dispatch(resetAuthData());
      router.push("/");
    } else {
      dispatch(setAuthLoading(true));
      try {
        await sendOTP(countryCode, contactNumber, true);
      } catch (error) {
        // console.error("Error sending OTP:", error);
      } finally {
        dispatch(setAuthLoading(false));
      }
    }
  };

  const editContactNumber = async () => {
    dispatch(setAuthStep(0));
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

      <div className=" flex flex-col gap-5">
        <div className=" flex gap-4 text-xs">
          {t("hint")} ******
          {contactNumber.substring(6)}{" "}
          <FaRegEdit
            onClick={() => editContactNumber()}
            className=" cursor-pointer"
          />
        </div>
        <div className="relative">
          <InputOTP
            inputType="custom"
            inputRegex="[0-9]"
            onChange={(value) => setOtpValues(value)}
            value={otpValues}
          />
          {otpErrors && <ErrorText text={otpErrors} />}
        </div>
        <Button
          loading={authLoading}
          disabled={authLoading}
          size="large"
          className="bg-black text-white1 font-semibold w-full border-none hover:shadow-xl"
          onClick={handleFinish}
        >
          {t("button")}
        </Button>
        <p className=" text-xs">
          {t("text")}
          <span
            onClick={() => resendOTP()}
            className=" cursor-pointer font-semibold text-base text-blue-600"
          >
            {t("resend")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
