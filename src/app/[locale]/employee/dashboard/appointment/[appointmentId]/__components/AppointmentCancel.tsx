import { cancelAppointment } from "@/app/services/operations/appointment/appointment";
import { Button, Modal } from "antd";
import React, { useState } from "react";

type Props = {
  appointmentId: string;
  setAppointmentLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppointmentCancel = (props: Props) => {
  const [openModel, setOpenModel] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancelAppointment = async () => {
    setConfirmLoading(true);
    try {
      const response = await cancelAppointment(props.appointmentId);
      if (response) {
        setOpenModel(false);
        if (props.setAppointmentLoading) {
          props.setAppointmentLoading(true);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setConfirmLoading(false);
    }
  };

  const closeModal = () => {
    setOpenModel(false);
  };
  const openModal = () => {
    setOpenModel(true);
  };

  return (
    <div>
      <Button onClick={openModal} className="bg-red-500 text-white">
        Cancel
      </Button>

      <Modal
        title="Title"
        open={openModel}
        onOk={handleCancelAppointment}
        confirmLoading={confirmLoading}
        onCancel={closeModal}
      >
        <p>Are You Sure Want to Cancel This Appointment ? </p>
      </Modal>
    </div>
  );
};

export default AppointmentCancel;
