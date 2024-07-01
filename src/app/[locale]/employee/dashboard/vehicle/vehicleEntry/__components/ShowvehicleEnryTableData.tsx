"use client";
import { Modal, Table } from "antd";
import React, { useState } from "react";
import GetVehicleEntryTableColumn from "./GetVehicleEntryTableCoulmn";
import { TVehicleEntry } from "@/app/types/vehicle-checklist";
import CreateExitVehicle from "./CreateExitVehicle";

type props = {
  VehicleEntry: TVehicleEntry[];
  getAllVehicleEntry: () => Promise<void>;
};

const ShowvehicleEnryTableData = ({
  VehicleEntry,
  getAllVehicleEntry,
}: props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");

  const showModal = (registrationNumber: string) => {
    setIsModalOpen(true);
    setRegistrationNumber(registrationNumber);
  };

  return (
    <div>
      <Table
        sticky={true}
        columns={GetVehicleEntryTableColumn({ showModal })}
        dataSource={VehicleEntry}
        scroll={{ x: 980 }}
      />

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <CreateExitVehicle
          registrationNumber={registrationNumber}
          setIsModalOpen={setIsModalOpen}
          getAllVehicleEntry={getAllVehicleEntry}
        />
      </Modal>
    </div>
  );
};

export default ShowvehicleEnryTableData;
