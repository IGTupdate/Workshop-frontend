import Loader from "@/app/components/Loader";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div
      style={{ height: "calc(100vh - 200px)" }}
      className="flex justify-center items-center w-full"
    >
      <Loader />
    </div>
  );
};

export default loading;
