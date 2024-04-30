import Loader from "@/app/components/Loader";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
    <Loader />
  </div>
  );
};

export default loading;
