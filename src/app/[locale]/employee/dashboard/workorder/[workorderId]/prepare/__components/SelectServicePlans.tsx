"use client";
import SelectField from "@/app/components/Input/SelectField";
import { getAllServicePlans } from "@/app/services/operations/appointment/service-plans";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import React, { useEffect, useState } from "react";
import SelectServicePlanForWorkOrder from "./SelectServicePlanForWorkOrder";
import {
  TworkorderPrepare,
  TWorkorderServicePlansPrepareScema,
  workorderPrepareYupSchema,
  WorkorderServicePlansPrepareScema,
} from "@/app/validators/workorder";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import { updateWorkOrder } from "@/app/services/operations/workorder/workorder";
import { TWorkOrder } from "@/app/types/work-order";
import toast from "react-hot-toast";
import Loader from "@/app/components/Loader";
import { MdOutlineCancel } from "react-icons/md";
import InputFieldWithButton from "@/app/components/Input/InputFieldWithButton";
import { suggestion_task } from "../../__utils/task_suggestion";

type Props = {
  workOrder: TWorkOrder | null;
  setSteps: React.Dispatch<React.SetStateAction<string>>;
};

const SelectServicePlans = ({ setSteps, workOrder }: Props) => {
  const [loading, setLoading] = useState(false);
  const { servicePlansLoading, servicePlansData } = useAppSelector(
    (state) => state.servicePlan,
  );
  console.log(servicePlansData);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<TWorkorderServicePlansPrepareScema>({
    resolver: yupResolver(WorkorderServicePlansPrepareScema),
    defaultValues: {
      partsRequested: [],
      servicePlanId: [],
      tasks: [],
    },
  });

  useEffect(() => {
    if (workOrder?.servicePlanId) {
      const selectedPlans = workOrder.servicePlanId.map((el) => {
        if (typeof el === "string") return el;
        return el._id;
      });
      setValue("servicePlanId", selectedPlans);
    }
  }, [workOrder, servicePlansData]);

  useEffect(() => {
    if (!servicePlansData.length) {
      dispatch(getAllServicePlans());
    }
  }, [dispatch, servicePlansData.length]);

  const appendValueInArrayField = (
    fieldName: keyof TWorkorderServicePlansPrepareScema,
    data: any,
  ) => {
    const prvVal = getValues(fieldName);
    if (prvVal && typeof prvVal === "object") {
      setValue(fieldName, [...prvVal, data]);
    } else {
      setValue(fieldName, [data]);
    }
  };

  const removeValueInArrayField = (
    fieldName: keyof TWorkorderServicePlansPrepareScema,
    index: number,
  ) => {
    const prvVal = getValues(fieldName);
    if (prvVal && typeof prvVal === "object") {
      const newValue = prvVal.filter((el, ind) => {
        return ind !== index;
      }) as any;
      setValue(fieldName, newValue);
    }
  };

  const onSubmit = async (data: TWorkorderServicePlansPrepareScema) => {
    console.log(data);
    // return;
    if (workOrder?._id && data.servicePlanId?.length > 0) {
      setLoading(true);
      try {
        const result = await updateWorkOrder(
          workOrder._id,
          data as Partial<TWorkOrder>,
        );
        if (result?.success === true) {
          toast.success("Plans Selected Successfully");
          setLoading(false);
          setSteps("3");
        }
      } catch (error) {
        toast.error("Something Went Wrong Please Try Again");
        setLoading(false);
      }
    } else {
      toast.error("Please Select Service Plans");
    }
  };

  return (
    <>
      {loading ? (
        <div
          style={{ height: "calc(100vh - 400px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <SelectServicePlanForWorkOrder
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          <div>
            <div className="mb-10">
              <div className="mb-4 w-full">
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
                  suggestions={suggestion_task}
                />

                <ul className="mt-2 flex flex-wrap justify-between items-center">
                  {watch("tasks")?.map((task, index) => {
                    return (
                      <li
                        key={index}
                        className='relative mb-2 flex justify-between items-center gap-4 ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300 w-1/2 pe-2'
                      >
                        <p>{task.title}</p>
                        <button
                          type="button"
                          onClick={() => {
                            removeValueInArrayField("tasks", index);
                          }}
                        >
                          <MdOutlineCancel size={16} className="text-red-500" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4 mt-4">
            <Button onClick={() => setSteps("1")}>Back</Button>
            <Button htmlType="submit" type="primary">
              Save & Continue
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default SelectServicePlans;
