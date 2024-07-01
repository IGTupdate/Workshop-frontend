import { Table } from "antd";
import React, { useState } from "react";
import GetChecklistDataTableColumn from "./GetChecklistDataTableColumn";
import { TVehicleCheckListDataTable } from "@/app/types/checklist";
import VehicleCheckListDeleteModal from "./VehicleCheckListDeleteModal";

type Props = {
  vehicleCheckLists: TVehicleCheckListDataTable[];
};

const VehicleCheckListTableContainer = (props: Props) => {
  const [openCheckListModal, setOpenCheckListModal] = useState<string | null>(
    null,
  );

  const handleOpenCheckListModal = (data: string) => {
    setOpenCheckListModal(data);
  };

  const handleCloseCheckListModal = () => {
    setOpenCheckListModal(null);
  };

  return (
    <div>
      <Table
        sticky={true}
        pagination={false}
        columns={GetChecklistDataTableColumn({ handleOpenCheckListModal })}
        dataSource={props.vehicleCheckLists}
        scroll={{ x: 980 }}
      />

      {/* delete modal */}
      <VehicleCheckListDeleteModal
        openModal={openCheckListModal}
        handleCloseCheckListModal={handleCloseCheckListModal}
      />
    </div>
  );
};

export default VehicleCheckListTableContainer;
