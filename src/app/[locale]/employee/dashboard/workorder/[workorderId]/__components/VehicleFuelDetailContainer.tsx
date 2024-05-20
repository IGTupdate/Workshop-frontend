import React from "react";

import GaugeChart from "react-gauge-chart";
type Props = {
  fuelQuantity: number | undefined;
};

const VehicleFuelDetailContainer = (props: Props) => {
  return (
    <div>
      <GaugeChart
        nrOfLevels={420}
        arcsLength={[0.1, 0.4, 0.5]}
        colors={["#EA4228", "#F5CD19", "#5BE12C"]}
        percent={props.fuelQuantity ? props.fuelQuantity / 100 : 0}
        arcPadding={0.02}
        style={{ width: "50%" }}
        textColor={"black"}
        needleColor={"orange"}
        needleBaseColor={"black"}
      />
    </div>
  );
};

export default VehicleFuelDetailContainer;
