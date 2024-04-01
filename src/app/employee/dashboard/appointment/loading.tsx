import Loader from "@/app/components/Loader";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="p-4 bg-white rounded-md">
      <Loader />
    </div>
  );
};

export default loading;
