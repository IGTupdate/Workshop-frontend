import Heading from "@/app/components/Heading";
import ErrorText from "@/app/components/Text/ErrorText";
import { sendOTP } from "@/app/services/operations/auth/customerAuth";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import {
  setAuthCountryCode,
  setAuthData,
  setAuthLoading,
  setAuthStep,
} from "@/app/store/slices/authSlice";
import { Button, Input, Select, Space } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Logo from "../../../../public/images/logo-3.webp";
import { log } from "console";

interface FormInputs {
  contactNumber: string;
}

type Tprops = {};
const SendOTP = (props: Tprops) => {
  const { handleSubmit } = useForm<FormInputs>();

  const dispatch = useAppDispatch();
  // const contact = useAppSelector((state) => state.auth.authData.contactNumber);
  const { authLoading } = useAppSelector((state) => state.auth);
  const [countryCode, setCountryCode] = useState("+52");
  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (contactNumber.length === 0)
      setContactNumberError("Contact Number is Required");
    if (contactNumber.length !== 10) return;

    let number = countryCode === "+52" ? 1 + contactNumber : contactNumber;

    dispatch(setAuthLoading(true));
    try {
      const result = await sendOTP(countryCode, number);
      if (result?.data.success) {
        dispatch(setAuthStep(1));
        dispatch(setAuthData({ contactNumber: number }));
        dispatch(setAuthCountryCode(countryCode));
      }
    } catch (error) {
      // console.error("Error sending OTP:", error);
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const reg = /^[0-9]*$/; // Regex to match only digits

    if (!reg.test(inputValue)) {
      setContactNumberError("Contact Number must be digits");
      return;
    } else if (inputValue.length !== 10) {
      setContactNumberError("Contact Number must have 10 digits");
    } else {
      setContactNumberError("");
    }

    setContactNumber(inputValue);
  };

  const handleSelect = (value: string) => {
    setCountryCode(value);
  };

  return (
    <div className="w-full">
      {/* <Image src={Logo} alt="Logo" className="mb-8 w-[200px]" /> */}

      <Heading
        type="heading1"
        primary={"Authenticate"}
        secondary={"Give Your Identity"}
        primaryColor="text-black1"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        {/* <div className="mb-6 relative shadow-xl p-4 rounded-xl"> */}
        <label className="text-base font-medium mb-1 block text-black1">
          Phone
        </label>
        <div className="flex w-full justify-between items-center gap-2">
          <Select
            size="large"
            defaultValue="+52"
            // style={{ width: '22%', height: 42 }}
            className="w-[28%] sm:w-[25%] h-[42px]"
            onChange={handleSelect}
            options={[
              { value: "+52", label: "+52" },
              { value: "+91", label: "+91" },
            ]}
          />

          <Space.Compact
            // style={{ width: '78%', height: '42px' }}
            className="w-[72%] sm:w-[75%] h-[42px]"
          >
            {/* <Input style={{ width: '13%' }} defaultValue="1" /> */}
            <Input
              style={{ height: "100%" }}
              addonBefore={countryCode === "+52" && "1"}
              size="large"
              value={contactNumber}
              onChange={handleChange}
              placeholder="Enter Your Contact Number"
              maxLength={10}
            />
          </Space.Compact>
        </div>
        {contactNumberError && <ErrorText text={contactNumberError} />}
        {/* </div> */}
        <Button
          loading={authLoading}
          disabled={authLoading}
          size="large"
          htmlType="submit"
          className="bg-black text-white1 font-semibold w-full border-none hover:shadow-xl"
        >
          Send Verification Code
        </Button>
      </form>
    </div>
  );
};

export default SendOTP;
