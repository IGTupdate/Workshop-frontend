"use client"
import SendOTP from "./__components/SendOTP";
import { useAppSelector } from "../store/reduxHooks";
import VerifyOTP from "./__components/VerifyOTP";

export default function Auth() {
  const step = useAppSelector((state) => state.auth.authStep)

  return (
    <div>
      {step === 0 && <SendOTP/>}
      {step === 1 && <VerifyOTP/>}
      {step === 2 && <div>Register</div>}
    </div>
  );
}
