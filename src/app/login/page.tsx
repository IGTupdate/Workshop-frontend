"use client"
import { useState } from "react";
import SendOTP from "../components/customer/SendOTP";

export default function Auth() {
  const [step, setStep] = useState(0);

  return (
    <div>
      {step === 0 && <SendOTP setStep={setStep} />}
      {step === 1 && <div>Hello</div>}
    </div>
  );
}
