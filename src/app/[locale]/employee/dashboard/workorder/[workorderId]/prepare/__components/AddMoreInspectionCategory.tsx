"use client";
import { FaPlus } from "react-icons/fa6";

import React, { useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import InputField from "@/app/components/Input/InputField";
import { useForm } from "react-hook-form";
import {
  TworkOrderVehicleInspectionAddMoreCategory,
  workOrderVehicleInspectionAddMoreCategory,
} from "@/app/validators/workorder";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

type Props = {
  onAddCategory: (category: string) => boolean;
};

const AddMoreInspectionCategory = (props: Props) => {
  const [addMoreOpenModal, setAddMoreOpenModel] = useState(false);

  const openModal = () => {
    setAddMoreOpenModel(true);
  };

  const closeModal = () => {
    setAddMoreOpenModel(false);
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TworkOrderVehicleInspectionAddMoreCategory>({
    defaultValues: {
      category: "",
    },
    resolver: yupResolver(workOrderVehicleInspectionAddMoreCategory),
  });

  const handleAddCategory = (
    data: TworkOrderVehicleInspectionAddMoreCategory,
  ) => {
    if (props.onAddCategory(data.category)) {
      closeModal();
    } else {
      toast.error("Category Already Exist");
    }
  };
  return (
    <div>
      <Tooltip title="Add more">
        <Button
          onClick={openModal}
          type="primary"
          shape="circle"
          icon={<FaPlus />}
        />
      </Tooltip>

      <Modal
        title="Inspect Vehicle - Add More Category"
        open={addMoreOpenModal}
        onCancel={closeModal}
        // onOk={() => {  }}
        okButtonProps={{ htmlType: "submit" }}
        footer={(_, { OkBtn, CancelBtn }) => <></>}
      >
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <div className="py-4">
            <InputField
              type="text"
              name="category"
              label="Category Name"
              placeholder="Enter the Category"
              control={control}
              error={errors.category?.message || ""}
            />
          </div>
          <div className="flex justify-end mt-2">
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddMoreInspectionCategory;
