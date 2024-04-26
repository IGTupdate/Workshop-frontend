"use client";

import InputField from "@/app/components/Input/InputField";
import InputFieldWithButton from "@/app/components/Input/InputFieldWithButton";
import TextAreaField from "@/app/components/Input/TextArea";
import TimeField from "@/app/components/Input/TimeField";
import { TWorkOrder } from "@/app/types/work-order";
import {
  TworkorderPrepare,
  workorderPrepareYupSchema,
} from "@/app/validators/workorder";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import toast from "react-hot-toast";
import { prepareWorkOrder } from "@/app/services/operations/workorder/workorder";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import SelectServicePlanForWorkOrder from "./SelectServicePlanForWorkOrder";
import { useRouter } from "next/navigation";

type Props = {
  workOrder: TWorkOrder;
};

const WorkOrderFormContainer = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<TworkorderPrepare>({
    defaultValues: {
      estimatedCost: props.workOrder.estimatedCost,
      fuelQuantity: props.workOrder.fuelQuantity,
      notes: props.workOrder.notes,
      servicePlanId: (props.workOrder.servicePlanId as string[]) || [],
      observations: props.workOrder.observations || [],
      estimatedTimeOfCompletion: props.workOrder.estimatedTimeOfCompletion,
      partsRequested: props.workOrder.partsRequested,
      tasks: props.workOrder.tasks || [],
      odometerReading: props.workOrder.odometerReading,
    },
    resolver: yupResolver(workorderPrepareYupSchema),
  });

  const onSubmit = async (data: TworkorderPrepare) => {
    try {
      setLoading(true);
      const response = await prepareWorkOrder(props.workOrder._id, data);
      toast.success(response?.message);
      router.push(`/employee/dashboard/workorder/${props.workOrder._id}`);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const appendValueInArrayField = (
    fieldName: keyof TworkorderPrepare,
    data: any
  ) => {
    const prvVal = getValues(fieldName);
    if (prvVal && typeof prvVal === "object") {
      setValue(fieldName, [...prvVal, data]);
    } else {
      setValue(fieldName, [data]);
    }
  };

  const removeValueInArrayField = (
    fieldName: keyof TworkorderPrepare,
    index: number
  ) => {
    const prvVal = getValues(fieldName);
    if (prvVal && typeof prvVal === "object") {
      const newValue = prvVal.filter((el, ind) => {
        return ind !== index;
      }) as any;
      setValue(fieldName, newValue);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6"></div>
        <div className="w-full grid md:grid-cols-2 grid-cols-1  gap-4">
          <div className=" mb-4">
            <InputField
              name={"fuelQuantity"}
              label={"Fuel Quantity"}
              type={"text"}
              placeholder={"Fuel Quantity"}
              control={control}
              error={errors.fuelQuantity ? errors.fuelQuantity.message : ""}
            />
          </div>

          <div className=" mb-4">
            <InputField
              name={"odometerReading"}
              label={"Odometer Reading"}
              type={"text"}
              placeholder={"25"}
              control={control}
              error={
                errors.odometerReading ? errors.odometerReading.message : ""
              }
            />
          </div>
        </div>

        <SelectServicePlanForWorkOrder
          errors={errors}
          setValue={setValue}
          watch={watch}
        />

        <div>
          <div className="mb-4 md:w-1/2">
            <InputFieldWithButton
              handleButtonClick={(value: string) => {
                if (value) {
                  appendValueInArrayField("tasks", { title: value });
                }
              }}
              name={"tasks"}
              label={"Tasks"}
              type={"text"}
              placeholder={"Check the headlight"}
            />

            <ul className="mt-2">
              {watch("tasks")?.map((task, index) => {
                return (
                  <li
                    key={index}
                    className='relative flex items-center gap-4 ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300'
                  >
                    <p>{task.title}</p>{" "}
                    <button
                      onClick={() => {
                        removeValueInArrayField("tasks", index);
                      }}
                    >
                      <MdOutlineCancel />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div>
          <div className="mb-4 md:w-1/2">
            <InputFieldWithButton
              handleButtonClick={(value: string) => {
                if (value) {
                  appendValueInArrayField("partsRequested", {
                    partName: value,
                  });
                }
              }}
              name={"partsRequested"}
              label={"Parts Required"}
              type={"text"}
              placeholder={"MRF Tyre"}
            />
            <ul className="mt-2">
              {watch("partsRequested")?.map((part, index) => {
                return (
                  <li
                    key={index}
                    className='relative flex items-center gap-4 ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300'
                  >
                    <p>{part.partName}</p>{" "}
                    <button
                      onClick={() => {
                        removeValueInArrayField("partsRequested", index);
                      }}
                    >
                      <MdOutlineCancel />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div>
          <div className="mb-4 md:w-1/2">
            <InputFieldWithButton
              handleButtonClick={(value: string) => {
                if (value) {
                  appendValueInArrayField("observations", value);
                }
              }}
              name={"observations"}
              label={"observations"}
              type={"text"}
              placeholder={"Right Tyre"}
            />
            <ul className="mt-2">
              {watch("observations")?.map((observation, index) => {
                return (
                  <li
                    key={index}
                    className='relative flex items-center gap-4 ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300'
                  >
                    <p>{observation || ""}</p>
                    <button
                      type="button"
                      onClick={() => {
                        removeValueInArrayField("observations", index);
                      }}
                    >
                      <MdOutlineCancel />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <TextAreaField
            name={"notes"}
            label={"Notes"}
            placeholder={"Write service instructions"}
            control={control}
            error={errors.notes ? errors.notes.message : ""}
          />
        </div>

        <div className="w-full grid md:grid-cols-2 grid-cols-1  gap-4">
          <div className=" mb-4">
            <InputField
              name={"estimatedCost"}
              label={"EstimatedCost"}
              type={"number"}
              placeholder={"50"}
              control={control}
              error={errors.estimatedCost ? errors.estimatedCost.message : ""}
            />
          </div>
          <div className=" mb-4">
            <TimeField
              name={"estimatedTimeOfCompletion"}
              label={"Estimated Completion Time"}
              setValue={setValue}
              placeholder={"25"}
              defaultValue={getValues("estimatedTimeOfCompletion")}
              error={
                errors.estimatedTimeOfCompletion
                  ? errors.estimatedTimeOfCompletion.message
                  : ""
              }
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button disabled={loading} htmlType="submit" type="primary">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkOrderFormContainer;
