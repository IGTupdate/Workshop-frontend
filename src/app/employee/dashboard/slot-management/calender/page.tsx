import React from "react";
import CalenderContainer from "./__components/CalenderContainer";


type Props = {};

const page = async (props: Props) => {

  return (
    <div className="p-4 bg-white rounded-md">
      {/* heading */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Calender</h2>
      </div>

      <div className="">
        <CalenderContainer />
      </div>
    </div>
  );
};

export default page;
