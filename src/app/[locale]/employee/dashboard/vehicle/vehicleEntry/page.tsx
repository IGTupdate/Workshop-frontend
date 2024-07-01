"use client";
import { Button, Modal } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import VehicleEntryTabelContainer from "./__components/VehicleEntryTabelContainer";
import CreateEntryVehicle from "./__components/CreateEntryVehicle";
import { TVehicleEntry } from "@/app/types/checklist";
import {
  getVehicleEntry,
  VehicleEntry,
} from "@/app/services/operations/appointment/vehicle";
import { TVehicleSchema } from "@/app/validators/vehicle-entry";

const Page = () => {
  const [vehicleEntry, setVehicleEntry] = useState<TVehicleEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getAllVehicleEntry();
  }, []);

  const getAllVehicleEntry = async () => {
    const result = await getVehicleEntry();
    if (result?.data?.length > 0) {
      setVehicleEntry(result.data);
    }
  };

  const onSubmit = async (data: TVehicleSchema) => {
    const result = await VehicleEntry(data);
    if (result?.success === true) {
      getAllVehicleEntry();
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-xl">
          <h2 className="text-xl font-semibold">Vehicle Entry</h2>
          {/* <Link href={`/employee/dashboard/vehicle/vehicleEntry/create`}> */}
          <Button type="primary" onClick={showModal}>
            Enter Vehicle
          </Button>
          {/* </Link> */}
        </div>

        <VehicleEntryTabelContainer
          vehicleEntry={vehicleEntry}
          getAllVehicleEntry={getAllVehicleEntry}
        />
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <CreateEntryVehicle onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

export default Page;
