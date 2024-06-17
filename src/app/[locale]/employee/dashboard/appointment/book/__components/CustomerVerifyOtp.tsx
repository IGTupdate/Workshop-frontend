"use client";

import { useState } from "react";
import { Button } from "antd";
import { InputOTP } from "antd-input-otp";
import Heading from "@/app/components/Heading";
import ErrorText from "@/app/components/Text/ErrorText";
import toast from "react-hot-toast";
import { TCustomer } from "@/app/types/customer";
import { authEndpoints } from "@/app/services/apis";
import { apiOpenConnector } from "@/app/services/apiOpenConnector";
import { useAppSelector } from "@/app/store/reduxHooks";
import { useTranslations } from "next-intl";
import { setAuthLoading } from "@/app/store/slices/authSlice";
import { sendOTP } from "@/app/services/operations/auth/customerAuth";
import { useDispatch } from "react-redux";

const { VERIFY_OTP_API } = authEndpoints;

type Props = {
  customer: TCustomer;
  setCustomer: React.Dispatch<React.SetStateAction<TCustomer>>;
  setAuthStep: React.Dispatch<React.SetStateAction<number>>;
};

const CustomerVerifyOtp = (props: Props) => {
  const { countryCode } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>([]);
  const [otpErrors, setOTPErrors] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const t = useTranslations("VerifyOTP");
  const dispatch = useDispatch();

  const handleFinish = async () => {
    const otp = otpValues.join("");
    if (!otp || otp.trim() === "") {
      setOTPErrors("OTP is required");
      return;
    }
    if (otp.length !== 6) {
      setOTPErrors("OTP must be of 6 digits");
      return;
    }
    if (otp.length === 6) {
      setOTPErrors("");
    }

    setLoading(true);

    let result;
    try {
      const response = await apiOpenConnector({
        method: "POST",
        url: VERIFY_OTP_API,
        bodyData: {
          countryCode,
          contactNumber: props.customer.contactNumber,
          otp,
        },
      });
      props.setCustomer((prv) => {
        return {
          ...prv,
          _id: response?.data?.data?._id,
        };
      });

      if (response?.data?.data.userExists) {
        props.setAuthStep(3);
      } else {
        props.setAuthStep(2);
      }
      toast.success("OTP VERIFY SUCCESSFULLY");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    dispatch(setAuthLoading(true));
    try {
      await sendOTP(countryCode, props.customer.contactNumber, true);
    } catch (error) {
      // console.error("Error sending OTP:", error);
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <div className="w-full">
      <Heading
        type="heading1"
        primary={"OTP"}
        secondary={"Give Your Identity"}
        primaryColor="text-black1"
      />

      <div className=" flex flex-col gap-8">
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
          loading={loading}
          disabled={loading}
          size="large"
          htmlType="submit"
          className="bg-black text-white1 font-semibold w-full border-none hover:shadow-xl"
          onClick={handleFinish}
        >
          Send
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

export default CustomerVerifyOtp;
