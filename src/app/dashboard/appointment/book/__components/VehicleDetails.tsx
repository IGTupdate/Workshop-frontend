import { TVehicle } from "@/app/types/vehicle";
import { formatDateAndTime } from "@/app/utils/dateFormatter";
import { Button, Descriptions } from "antd";
import React from "react";

type Props = {
  vehicleDetails: TVehicle;
  setVehicleId: React.Dispatch<React.SetStateAction<string>>;
  setUpdateVehicleId: React.Dispatch<React.SetStateAction<string>>;
  onDeleteVehicle: (_id: string) => void;
};

const VehicleDetails = (props: Props) => {
  const { vehicleDetails, setVehicleId, setUpdateVehicleId } = props;

  return (
    <>
      <div className="hidden sm:block">
        <Descriptions
          column={2}
          className="p-4 pb-0 bg-white rounded-xl shadow-xl"
        >
          <Descriptions.Item
            label="Vehicle Make"
            className="font-semibold text-nowrap uppercase"
          >
            {vehicleDetails.vehicle_make}
          </Descriptions.Item>
          <Descriptions.Item
            label="Vehicle Model"
            className="font-semibold text-nowrap uppercase"
          >
            {vehicleDetails.vehicle_model}
          </Descriptions.Item>
          <Descriptions.Item
            label="VIN"
            className="font-semibold text-nowrap uppercase"
          >
            {vehicleDetails.vin}
          </Descriptions.Item>
          <Descriptions.Item
            label="Registration Number"
            className="font-semibold text-nowrap uppercase"
          >
            {vehicleDetails.registeration_number}
          </Descriptions.Item>
          <Descriptions.Item label="Owner" className="font-semibold uppercase">
            {vehicleDetails.owner}
          </Descriptions.Item>
          <Descriptions.Item
            label="Created At"
            className="font-semibold text-nowrap uppercase"
          >
            {formatDateAndTime(vehicleDetails.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item
            label=""
            contentStyle={{
              display: "flex",
              justifyContent: "end",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <Button
              type="primary"
              onClick={() => setVehicleId(vehicleDetails._id)}
            >
              Select Vehicle
            </Button>
            <Button
              type="primary"
              onClick={() => setUpdateVehicleId(vehicleDetails._id)}
            >
              Update Vehicle
            </Button>
            <Button
              type="primary"
              onClick={() => props.onDeleteVehicle(vehicleDetails._id)}
            >
              Delete Vehicle
            </Button>
          </Descriptions.Item>
        </Descriptions>
      </div>

      <div className="block sm:hidden">
        <div className="p-4 bg-white rounded-xl shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 pb-4">
            <div className="flex items-center gap-2">
              <p className="text-antGreay">Vehicle Make:</p>{" "}
              <p className="font-semibold text-nowrap">
                {vehicleDetails.vehicle_make}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-antGreay">Vehicle Model:</p>{" "}
              <p className="font-semibold text-nowrap">
                {vehicleDetails.vehicle_model}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 pb-4">
            <div className="flex items-center gap-2">
              <p className="text-antGreay">VIN:</p>{" "}
              <p className="font-semibold text-nowrap">{vehicleDetails.vin}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-antGreay">Created At:</p>{" "}
              <p className="font-semibold text-nowrap">
                {vehicleDetails.registeration_number}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 pb-4">
            <div className="flex items-center gap-2">
              <p className="text-antGreay">Owner:</p>{" "}
              <p className="font-semibold text-nowrap">
                {vehicleDetails.owner}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-antGreay">Registration Number:</p>{" "}
              <p className="font-semibold text-nowrap">
                {vehicleDetails.createdAt}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4 items-center flex-wrap">
            <Button
              type="primary"
              onClick={() => setVehicleId(vehicleDetails._id)}
            >
              Select
            </Button>
            <Button
              type="primary"
              onClick={() => setUpdateVehicleId(vehicleDetails._id)}
            >
              Update
            </Button>
            <Button
              type="primary"
              onClick={() => props.onDeleteVehicle(vehicleDetails._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleDetails;
