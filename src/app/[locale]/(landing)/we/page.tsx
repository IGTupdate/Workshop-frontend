import React from "react";
import CarDashboard from "./__components/CarDashboard";
import Committed from "./__components/Committed";
import CustomCards from "./__components/CustomCards";
import Icons from "./__components/Icons";

const page = () => {
  return (
    <div>
      <CarDashboard />

      <div className="bg-[#1F1F1F]">
        <Committed />
      </div>

      <div className="bg-black relative overflow-hidden">
        <CustomCards />
      </div>

      <div className="bg-[#1F1F1F]">
        <Icons />
      </div>
    </div>
  );
};

export default page;
