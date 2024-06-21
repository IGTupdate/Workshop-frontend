import DescriptionItem from "@/app/components/DescriptionItem.tsx";
import { IWorkorderChecklistTask } from "@/app/types/workorder-checklist";
import { Button, Modal } from "antd";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  task: IWorkorderChecklistTask;
};

const WorkOrderCheckListTaskDetailView = (props: Props) => {
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleOpenModal = () => {
    setOpenViewModal(true);
  };

  const handleCloseModal = () => {
    setOpenViewModal(false);
  };
  return (
    <div>
      <Button type="link" onClick={handleOpenModal}>
        View
      </Button>

      <Modal
        // title="Details"
        open={openViewModal}
        onCancel={handleCloseModal}
        footer={<></>}
      >
        <div className="">
          <DescriptionItem
            title="Description"
            content={props.task.description?.text || "No Description found"}
          />
        </div>

        <div>
          {props.task.description?.images?.map((img, index) => {
            return <Image key={index} src={img} width={200} alt="img" />;
          })}
        </div>
      </Modal>
    </div>
  );
};

export default WorkOrderCheckListTaskDetailView;
