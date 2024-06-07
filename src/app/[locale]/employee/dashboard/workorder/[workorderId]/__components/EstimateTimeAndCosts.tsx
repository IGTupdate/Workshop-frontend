import InputField from "@/app/components/Input/InputField";
import TimeField from "@/app/components/Input/TimeField";
import Loader from "@/app/components/Loader";
import { updateWorkOrder } from "@/app/services/operations/workorder/workorder";
import { TWorkOrder } from "@/app/types/work-order";
import {
  TWorkorderEstimateTimeAndCostsScema,
  WorkorderEstimateTimeAndCostsScema,
} from "@/app/validators/workorder";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  setSteps: React.Dispatch<React.SetStateAction<string>>;
  workOrder: TWorkOrder | null;
};

const EstimateTimeAndCosts = ({ setSteps, workOrder }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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

  useEffect(() => {
    if (workOrder?.estimatedCost) {
      setValue("estimatedCost", workOrder.estimatedCost);
    }
    if (workOrder?.estimatedTimeOfCompletion) {
      setValue(
        "estimatedTimeOfCompletion",
        workOrder.estimatedTimeOfCompletion,
      );
    }
  }, [workOrder]);

  const onSubmit = async (data: TWorkorderEstimateTimeAndCostsScema) => {
    console.log(data);
    if (Object.keys(data).length > 0 && workOrder?._id) {
      setLoading(true);
      try {
        const result = await updateWorkOrder(workOrder._id, data);

        if (result.success === true) {
          toast.success("Work Order Updated Successfully");
          router.push(`/employee/dashboard/workorder/${workOrder._id}`);
        }

        console.log(result, "result");
      } catch (error) {
        toast.success("Work Order Not Updated Please Try Again Later");
      } finally {
        setLoading(false);
      }
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

          <div className="flex justify-end items-center gap-4 mt-4">
            <Button onClick={() => setSteps("2")}>Back</Button>
            <Button
              loading={loading}
              disabled={loading}
              htmlType="submit"
              type="primary"
            >
              Save & Confirm
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default EstimateTimeAndCosts;
