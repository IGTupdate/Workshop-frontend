"use client";
import SelectField from "@/app/components/Input/SelectField";
import { getAllServicePlans } from "@/app/services/operations/appointment/service-plans";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import React, { useEffect, useState } from "react";
import SelectServicePlanForWorkOrder from "../prepare/__components/SelectServicePlanForWorkOrder";
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

type Props = {
  id: string | undefined;
  setSteps: React.Dispatch<React.SetStateAction<string>>;
};

const SelectServicePlans = ({ id, setSteps }: Props) => {
  const [loading, setLoading] = useState(false);
  const { servicePlansLoading, servicePlansData } = useAppSelector(
    (state) => state.servicePlan,
  );
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
    if (!servicePlansData.length) {
      dispatch(getAllServicePlans());
    }
  }, [dispatch, servicePlansData.length]);

  const onSubmit = async (data: TWorkorderServicePlansPrepareScema) => {
    if (id && data.servicePlanId?.length > 0) {
      setLoading(true);
      try {
        const result = await updateWorkOrder(id, data as Partial<TWorkOrder>);
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
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

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
