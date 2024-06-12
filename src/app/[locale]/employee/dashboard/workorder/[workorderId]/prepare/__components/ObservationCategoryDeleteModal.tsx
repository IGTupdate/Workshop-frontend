import { TWorkOrderObservation } from "@/app/types/work-order";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

type Props = {
  handleConfirmDelete: () => void;
};

const ObservationCategoryDeleteModal = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOk = () => {
    props.handleConfirmDelete();
    handleModalCancel();
  };

  const handleModalCancel = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <MdOutlineCancel
        onClick={handleOpenModal}
        className="cursor-pointer"
        title="delete category"
      />

      <Modal
        title="Confirm"
        open={openModal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        Are You Sure Want to Delete ?
      </Modal>
    </div>
  );
};

export default ObservationCategoryDeleteModal;
