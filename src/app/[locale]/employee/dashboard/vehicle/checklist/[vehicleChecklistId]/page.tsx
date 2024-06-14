import React from "react";
import VehicleCheckListViewContainer from "./__components/VehicleCheckListViewContainer";
import Link from "next/link";
import { Button } from "antd";

type Props = {
  params: {
    vehicleChecklistId: string;
  };
};

const page = (props: Props) => {
  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">View CheckList</h2>

        <Link
          href={`/employee/dashboard/vehicle/checklist/${props.params.vehicleChecklistId}/update`}
        >
          <Button type="primary">Update</Button>
        </Link>
      </div>
      <VehicleCheckListViewContainer
        vehicleCheckListId={props.params.vehicleChecklistId}
      />
    </div>
  );
};

export default page;
