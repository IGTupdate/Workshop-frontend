import React from "react";
import Image from "next/image";
// import Car from "../../../../public/images/image-1.webp";
// import Logo from "../../../../public/images/logo-1.webp";
import Loader from "@/app/components/Loader";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="absolute z-50 top-0 left-0 w-full h-screen flex justify-center items-center">
      <div className="hidden md:block">
        <Loader />
      </div>
      <div className="relative w-full h-full md:hidden">
        <Image
          fill
          src={"/images/image-1.webp"}
          alt="Car"
          className="w-full h-full bg-center bg-cover md:hidden"
        />
        <div className="absolute bottom-6 left-1/2 translate-x-[-50%] w-4/5">
          <div className="relative">
            <Image
              fill
              src={"/images/logo-1.webp"}
              style={{ height: "auto", width: "auto" }}
              className="relative"
              alt="Logo"
            />
            <div className="absolute top-[20px] left-[50px] text-white text-lg">
              Welcome To
            </div>
          </div>

          <p className="mt-8 text-white">
            Schedule your service appointment, watch the progress inside the
            workshop and stay informed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
