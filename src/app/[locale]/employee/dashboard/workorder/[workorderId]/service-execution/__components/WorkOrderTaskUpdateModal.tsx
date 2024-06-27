"use client";

import TextAreaField from "@/app/components/Input/TextArea";
import { updateWorkOrder } from "@/app/services/operations/workorder/workorder";
import { TTask, TWorkOrder } from "@/app/types/work-order";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import {
  TWorkOrderTaskUpdateYupSchema,
  WorkOrderTaskUpdateYupSchema,
} from "@/app/validators/workorder";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal, Radio, Typography } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { workOrderTaskStatusEnum } from "../../../__utils/workOrderTaskStatus";

const { Text } = Typography;

type Props = {
  task: TTask;
  handleUpdateTask: (task: TTask) => void;
};

const WorkOrderTaskUpdateModal = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const params = useParams();

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(WorkOrderTaskUpdateYupSchema),
  });

  useEffect(() => {
    if (props.task) {
      setValue("status", props.task.status);
      setValue("remarks", props.task.remarks);
    }
  }, [props.task]);

  const handleOk = async (data: TWorkOrderTaskUpdateYupSchema) => {
    setConfirmLoading(true);
    try {
      const update_data = {
        task: {
          _id: props.task._id,
          ...data,
        },
      };
      const workOrderId = params.workorderId as string;
      const result = await updateWorkOrder(
        workOrderId,
        update_data as Partial<TWorkOrder>,
      );
      console.log(result);
      if (result?.success === true) {
        toast.success("Updated Successfully");
        props.handleUpdateTask({
          ...props.task,
          status: (data.status as workOrderTaskStatusEnum) || props.task.status,
          remarks: data.remarks,
        });
        handleCancelModal();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || COMMON_ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancelModal = () => {
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <div>
      <div>
        <button onClick={handleOpenModal}>
          <FaEdit size={16} />
        </button>
      </div>

      <Modal
        title={"Update Task - " + props.task.title}
        open={open}
        // onOk={handleOk}
        onCancel={handleCancelModal}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              type="primary"
              loading={confirmLoading}
              onClick={handleSubmit(handleOk)}
            >
              Ok
            </Button>
          </>
        )}
      >
        <div>
          <div>
            <label className="font-medium mb-2 block text-black1">Status</label>

            <div>
              <Controller
                name={"status"}
                control={control}
                render={({ field }) => {
                  return (
                    <Radio.Group {...field}>
                      <Radio value={workOrderTaskStatusEnum.Pending}>
                        Pending
                      </Radio>
                      <Radio value={workOrderTaskStatusEnum.Completed}>
                        Completed
                      </Radio>
                    </Radio.Group>
                  );
                }}
              />
            </div>

            {errors.status?.message && (
              <Text type="danger"> {errors.status?.message}</Text>
            )}
          </div>

          <div className="mt-4">
            <TextAreaField
              control={control}
              name="remarks"
              error={errors.remarks?.message || ""}
              label="Remarks"
              placeholder="Remarks..."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkOrderTaskUpdateModal;
