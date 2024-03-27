import React from "react";
import LogIn from "./LogIn";

type Props = {};

const RightSection = (props: Props) => {
  return (
    <div className="relative md:z-[0] z-[10] w-full h-full md:p-10 xl:pl-20 py-16 px-6 flex items-center justify-center xl:justify-start bg-white1 rounded-t-[50px]">
      <div className="w-full sm:max-w-[320px]">
        <LogIn />
      </div>
    </div>
  );
};

export default RightSection;
