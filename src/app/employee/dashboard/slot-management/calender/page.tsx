import React from "react";
import CalenderContainer from "./__components/CalenderContainer";
import { calenderData } from "./__demo";

type Props = {};

const page = async (props: Props) => {
  setTimeout(() => {
    console.log("loading");
  }, 3000);

  return (
    <div className="p-4 bg-white rounded-md">
      {/* heading */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Manage Calender</h2>
      </div>

      <div className="">
        <CalenderContainer calenderData={calenderData} />
      </div>
    </div>
  );
};

export default page;
