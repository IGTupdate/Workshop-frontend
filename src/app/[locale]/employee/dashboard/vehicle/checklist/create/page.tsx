import { Button } from "antd";
import Link from "next/link";
import React from "react";
import VehicleCheckListCreateContainer from "./__components/VehicleCheckListCreateContainer";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Create CheckList</h2>
      </div>
      <VehicleCheckListCreateContainer />
    </div>
  );
};

export default page;
