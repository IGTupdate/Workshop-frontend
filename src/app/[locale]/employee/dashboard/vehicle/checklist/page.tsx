import { Button } from "antd";
import Link from "next/link";
import React from "react";
import VehicleCheckListViewPage from "./__components/VehicleCheckListViewPage";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-xl">
        <h2 className="text-xl font-semibold">Manage CheckList</h2>
        <Link href={`/employee/dashboard/vehicle/checklist/create`}>
          <Button type="primary">Create Checklist</Button>
        </Link>
      </div>

      <VehicleCheckListViewPage />
    </div>
  );
};

export default page;
