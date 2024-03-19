"use client"
import SendOTP from "./__components/SendOTP";
import { useAppSelector } from "../store/reduxHooks";

export default function Auth() {
  const step = useAppSelector((state) => state.auth.authStep)

  return (
    <div>
      {step === 0 && <SendOTP/>}
      {step === 1 && <div>Hello</div>}
    </div>
  );
}
