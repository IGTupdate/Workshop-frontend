"use client";

import React from "react";
import CreateEmployeeContainer from "./__components/CreateEmployeeContainer";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Create Employee</h2>
      </div>
      <CreateEmployeeContainer />
    </div>
  );
};

export default page;
