import React from "react";
import CustomSlider from "./CustomSlider";
import SliderItmes from "@/app/utils/SliderItmes";

const Modules = () => {
  return (
    <div className="container">
      <CustomSlider SliderItems={SliderItmes} /> {/* Correct prop name */}
    </div>
  );
};

export default Modules;
