import React from "react";
import SlotScheduleContainer from "./__components/SlotScheduleContainer";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="p-4 bg-white rounded-md">
      <SlotScheduleContainer />
    </div>
  );
};

export default page;
