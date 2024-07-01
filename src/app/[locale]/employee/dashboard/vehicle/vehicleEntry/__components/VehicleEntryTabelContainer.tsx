"use client";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import GetVehicleEntryTableColumn from "./GetVehicleEntryTableCoulmn";
import { getVehicleEntry } from "@/app/services/operations/appointment/vehicle";
import ShowvehicleEnryTableData from "./ShowvehicleEnryTableData";
import { TVehicleEntry } from "@/app/types/checklist";

type props = {
  vehicleEntry: TVehicleEntry[];
  getAllVehicleEntry: () => Promise<void>;
};

const VehicleEntryTabelContainer = ({
  vehicleEntry,
  getAllVehicleEntry,
}: props) => {
  return (
    <>
      <ShowvehicleEnryTableData
        VehicleEntry={vehicleEntry}
        getAllVehicleEntry={getAllVehicleEntry}
      />
    </>
  );
};

export default VehicleEntryTabelContainer;
