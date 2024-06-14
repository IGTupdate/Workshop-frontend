import { deleteVehicleCheckList } from "@/app/services/operations/workorder/vehicle-checklist";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { Modal } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  openModal: string | null;
  handleCloseCheckListModal: () => void;
};

const VehicleCheckListDeleteModal = (props: Props) => {
  const [handleDeleteLoading, setHandleDelteLoading] = useState(false);

  const handleDeleteVehicleCheckList = async (vehicleCheckListId: string) => {
    setHandleDelteLoading(true);
    try {
      const response = await deleteVehicleCheckList(vehicleCheckListId);
      if (response) {
        toast.success(response.message);
        props.handleCloseCheckListModal();
        window.location.reload();
      } else throw "";
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      setHandleDelteLoading(false);
    }
  };

  return (
    <div>
      <Modal
        title="Confirm"
        open={props.openModal !== null}
        onOk={() => {
          if (props.openModal) {
            handleDeleteVehicleCheckList(props.openModal);
          }
        }}
        onCancel={props.handleCloseCheckListModal}
        okButtonProps={{ disabled: handleDeleteLoading }}
        cancelButtonProps={{
          disabled: handleDeleteLoading,
          loading: handleDeleteLoading,
        }}
      >
        <p>Are You Sure Want to delete this ?</p>
      </Modal>
    </div>
  );
};

export default VehicleCheckListDeleteModal;
