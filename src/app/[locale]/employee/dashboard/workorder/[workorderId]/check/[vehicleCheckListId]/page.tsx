import React from "react";
import VehicleCheckListContainer from "./__components/VehicleCheckListContainer";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="bg-white p-4">
      <VehicleCheckListContainer />
    </div>
  );
};

export default page;
