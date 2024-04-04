import React from "react";
import CalenderContainer from "./__components/CalenderContainer";
// import { calenderData } from "./__demo";
import { getAllCalender } from "@/app/services/operations/appointment/calender";
import { calenderData } from "./__demo";
import { TCalender } from "@/app/types/calender";

type Props = {};

const page = async (props: Props) => {

  return (
    <div className="p-4 bg-white rounded-md">
      {/* heading */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Manage Calender</h2>
      </div>

      <div className="">
        <CalenderContainer />
      </div>
    </div>
  );
};

export default page;
