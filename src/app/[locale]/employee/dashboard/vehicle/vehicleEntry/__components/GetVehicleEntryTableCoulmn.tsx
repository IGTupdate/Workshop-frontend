"use client";

import React, { useRef, useState } from "react";
import {
  Button,
  Flex,
  Popover,
  QRCode,
  Radio,
  RadioChangeEvent,
  Space,
  TableProps,
  Typography,
} from "antd";
import { TVehicleCheckListDataTable } from "@/app/types/checklist";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { deleteVehicleCheckList } from "@/app/services/operations/workorder/vehicle-checklist";
import { IoMdCloudDownload } from "react-icons/io";
import html2canvas from "html2canvas";
import dayjs from "dayjs";

type VehicleEntry = {
  entryTime: string;
  exitTime: string;
  registrationNumber: string;
  _id: string;
};

type props = {
  showModal: (registrationNumber: string) => void;
};
const GetVehicleEntryTableColumn = ({ showModal }: props) => {
  const router = useRouter();
  const qrCodeRef = useRef<HTMLDivElement | null>(null);
  const downloadQRCode = (registrationNumber: string) => {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current)
        .then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = `${registrationNumber} QR Code.png`;
          link.click();
        })
        .catch((error) => {
          console.error("Error capturing QR code:", error);
        });
    } else {
      console.error("QR code element is not available");
    }
  };

  const column_appointment_data_table: TableProps<VehicleEntry>["columns"] = [
    {
      title: "Registration Number",
      dataIndex: "registrationNumber",
      key: "registrationNumber",
      // ...GetColumnTextSearchProps<TAppointmentDataTable>("name"),
      render: (registrationNumber) => {
        return <p className="capitalize font-semibold">{registrationNumber}</p>;
      },
    },
    {
      title: "Entry Time",
      dataIndex: "entryTime",
      key: "entryTime",
      // ...GetColumnTextSearchProps<TAppointmentDataTable>("name"),
      render: (entryTime) => {
        return (
          <p className="capitalize font-semibold">
            {entryTime != undefined
              ? dayjs(entryTime).format("DD/MMM/YYYY  HH:MM A")
              : ""}
          </p>
        );
      },
    },
    {
      title: "Exit Time",
      dataIndex: "exitTime",
      key: "exitTime",
      // ...GetColumnTextSearchProps<TAppointmentDataTable>("name"),
      render: (exitTime) => {
        return (
          <p className="capitalize font-semibold">
            {exitTime != undefined
              ? dayjs(exitTime).format("DD/MMM/YYYY  HH:MM A")
              : ""}
          </p>
        );
      },
    },
    {
      title: "QR Code",
      dataIndex: "registrationNumber",
      key: "registrationNumber",
      // ...GetColumnTextSearchProps<TAppointmentDataTable>("name"),
      render: (registrationNumber) => {
        return (
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            content={
              <div ref={qrCodeRef}>
                <QRCode value={`https://ant.design/${registrationNumber}`} />
              </div>
            }
          >
            <Button
              type="primary"
              onClick={() => downloadQRCode(registrationNumber)}
            >
              <IoMdCloudDownload />
            </Button>
          </Popover>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: any) => {
        const { _id, exitTime, registrationNumber } = record;
        return (
          <div className="flex gap-2">
            {exitTime === undefined && (
              <Button
                onClick={() => showModal(registrationNumber)}
                type="primary"
              >
                Exit
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return column_appointment_data_table;
};

export default GetVehicleEntryTableColumn;
