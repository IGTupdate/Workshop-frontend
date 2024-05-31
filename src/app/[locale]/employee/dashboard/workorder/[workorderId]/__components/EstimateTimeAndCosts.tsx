import InputField from "@/app/components/Input/InputField";
import TimeField from "@/app/components/Input/TimeField";
import {
  TWorkorderEstimateTimeAndCostsScema,
  WorkorderEstimateTimeAndCostsScema,
} from "@/app/validators/workorder";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";

const EstimateTimeAndCosts = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<TWorkorderEstimateTimeAndCostsScema>({
    resolver: yupResolver(WorkorderEstimateTimeAndCostsScema),
    defaultValues: {
      estimatedCost: 0,
      estimatedTimeOfCompletion: new Date().toISOString(),
    },
  });

  const onSubmit = (data: TWorkorderEstimateTimeAndCostsScema) => {
    console.log(data, "data");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="mb-4">
          <InputField
            name={"estimatedCost"}
            label={"Estimated Cost"}
            type={"number"}
            placeholder={"50"}
            control={control}
            error={errors.estimatedCost ? errors.estimatedCost.message : ""}
          />
        </div>
        <div className="mb-4">
          <TimeField
            name={"estimatedTimeOfCompletion"}
            label={"Estimated Completion Time"}
            setValue={setValue}
            placeholder={"Select time"}
            defaultValue={new Date().toISOString()}
            error={
              errors.estimatedTimeOfCompletion
                ? errors.estimatedTimeOfCompletion.message
                : ""
            }
          />
        </div>
      </div>
      <Button htmlType="submit" type="primary">
        Save
      </Button>
    </form>
  );
};

export default EstimateTimeAndCosts;
