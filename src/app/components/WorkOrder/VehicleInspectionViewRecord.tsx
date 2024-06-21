"use client";

import VehicleFuelReadingContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/vehicle_inspection_record/VehicleFuelReadingContainer";
import VehicleOdometerReadingContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/vehicle_inspection_record/VehicleOdometerReadingContainer";
import VehiclePartsInspectionDetail from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/vehicle_inspection_record/VehiclePartsInspectionDetail";
import {
  TWorkOrderFuelQuantity,
  TWorkOrderObservation,
  TWorkOrderOdometerReading,
} from "@/app/types/work-order";
import { Typography } from "antd";

const { Title, Text } = Typography;

type Props = {
  observations: TWorkOrderObservation[];
  odometerReading: TWorkOrderOdometerReading | null;
  fuelQuantity: TWorkOrderFuelQuantity | null;
};

const VehicleInspectionViewRecord = (props: Props) => {
  return (
    <div className="flex flex-col gap-6 bg-white p-4 rounded-xl shadow-xl">
      <div>
        <div className="grid grid-cols-2">
          {/* odometerReading */}
          <VehicleOdometerReadingContainer
            odometerReading={props.odometerReading}
          />

          {/* fuelQuantity */}
          <VehicleFuelReadingContainer fuelQuantity={props.fuelQuantity} />
        </div>

        {/* observations */}
        <VehiclePartsInspectionDetail observations={props.observations} />
      </div>
    </div>
  );
};

export default VehicleInspectionViewRecord;
