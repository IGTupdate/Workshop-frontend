import React from "react";
import CalenderContainer from "./__components/CalenderContainer";


type Props = {};

const page = async (props: Props) => {

  return (
    <div className="">
      {/* heading */}
      <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-xl">
        <h2 className="text-xl font-semibold">Manage Calender</h2>
      </div>

      <div className="p-4 shadow-xl bg-white rounded-xl">
        <CalenderContainer />
      </div>
    </div>
  );
};

export default page;
