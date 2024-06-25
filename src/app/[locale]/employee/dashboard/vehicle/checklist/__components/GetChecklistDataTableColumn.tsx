"use client";

import React, { useState } from "react";
import {
  Button,
  Flex,
  Radio,
  RadioChangeEvent,
  Space,
  TableProps,
  Typography,
} from "antd";
import { TVehicleCheckListDataTable } from "@/app/types/vehicle-checklist";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { deleteVehicleCheckList } from "@/app/services/operations/workorder/vehicle-checklist";

type TGetChecklistDataTableColumn = {
  handleOpenCheckListModal: (data: string) => void;
};
const GetChecklistDataTableColumn = ({
  handleOpenCheckListModal,
}: TGetChecklistDataTableColumn) => {
  const router = useRouter();
  const column_appointment_data_table: TableProps<TVehicleCheckListDataTable>["columns"] =
    [
      {
        title: "Vehicle Type",
        dataIndex: "vehicle_type",
        key: "vehicle_type",
        // ...GetColumnTextSearchProps<TAppointmentDataTable>("name"),
        render: (vehicle_type) => {
          return <p className="capitalize font-semibold">{vehicle_type}</p>;
        },
      },
      {
        title: "Vehicle",
        dataIndex: "vehicle",
        key: "vehicle",
        // ...GetColumnTextSearchProps<TAppointmentDataTable>("name"),
        render: (_, { vehicle }) => {
          return (
            <p className="capitalize font-semibold">
              {vehicle.brand
                ? `${vehicle.brand || "-"},${vehicle.model || "-"}, ${vehicle.year || "-"}`
                : "-"}
              {/* {vehicle.brand}, {vehicle.model}, {vehicle.year} */}
            </p>
          );
        },
      },
      {
        title: "Levels",
        dataIndex: "levels",
        key: "levels",
        // ...GetColumnTextSearchProps<TAppointmentDataTable>("name"),
        render: (levels) => {
          return <p className="capitalize font-semibold">{levels}</p>;
        },
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, { _id }) => {
          return (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  router.push(`/employee/dashboard/vehicle/checklist/${_id}`);
                }}
                type="button"
              >
                <FaEye className="w-5 h-5 text-blue-500" />
              </button>
              <button
                onClick={() => {
                  router.push(
                    `/employee/dashboard/vehicle/checklist/${_id}/update`,
                  );
                }}
                type="button"
              >
                <FaRegEdit className="w-5 h- text-blue-500" />
              </button>
              <button
                type="button"
                onClick={() => {
                  handleOpenCheckListModal(_id);
                }}
              >
                <MdDeleteOutline className="w-5 h-5 text-red-500" />
              </button>
            </div>
          );
        },
      },
    ];

  return column_appointment_data_table;
};

export default GetChecklistDataTableColumn;
