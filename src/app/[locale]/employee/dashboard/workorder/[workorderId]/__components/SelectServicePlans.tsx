"use client";
import SelectField from "@/app/components/Input/SelectField";
import { getAllServicePlans } from "@/app/services/operations/appointment/service-plans";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import React, { useEffect } from "react";
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

const SelectServicePlans = () => {
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
    console.log(data, "data");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectServicePlanForWorkOrder
        errors={errors}
        setValue={setValue}
        watch={watch}
      />

      <Button htmlType="submit" type="primary">
        Save
      </Button>
    </form>
  );
};

export default SelectServicePlans;
