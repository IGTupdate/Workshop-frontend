import CameraInputField from "@/app/components/Input/CameraInputField";
import InputField from "@/app/components/Input/InputField";
import { updateWorkOrder } from "@/app/services/operations/workorder/workorder";
import {
  TWorkOrder,
  TWorkOrderFuelQuantity,
  TWorkOrderOdometerReading,
} from "@/app/types/work-order";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import {
  TWorkOrderOdometerAndFuelCreateSchema,
  TworkorderPrepare,
  workOrderOdometerAndFuelCreateSchema,
} from "@/app/validators/workorder";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Image, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  setSteps: React.Dispatch<React.SetStateAction<string>>;
  // workOrderId : string
  workOrder: Partial<TWorkOrder>;
};

const OdometerAndFuel = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TWorkOrderOdometerAndFuelCreateSchema>({
    defaultValues: {
      odometerReading: {
        images: [],
        value: 0,
      },
      fuelQuantity: {
        images: [],
      },
    },
    resolver: yupResolver(workOrderOdometerAndFuelCreateSchema),
  });

  useEffect(() => {
    console.log("hello chagned");
    if (props.workOrder.fuelQuantity) {
      setValue("fuelQuantity.images", props.workOrder.fuelQuantity.images);
      setValue("fuelQuantity.value", props.workOrder.fuelQuantity.value);
    }
    if (props.workOrder.odometerReading) {
      setValue(
        "odometerReading.images",
        props.workOrder.odometerReading.images,
      );
      setValue("odometerReading.value", props.workOrder.odometerReading.value);
    }
  }, [props.workOrder]);

  const onSubmit = async (data: TWorkOrderOdometerAndFuelCreateSchema) => {
    console.log(data, "data");
    setLoading(true);
    try {
      const result = await updateWorkOrder(
        props.workOrder?._id || "",
        data as Partial<TWorkOrder>,
      );
      if (result?.success === true) {
        toast.success("Plans Selected Successfully");
        props.setSteps("1");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <h3 className="text-lg font-bold">Odometer Reading</h3>
          <p>Please Enter Current Meter Reading</p>
        </div>
        <div className="flex gap-4 items-end my-4">
          <CameraInputField
            addImage={(imgUrl: string) => {
              console.log(imgUrl);
              const oldImages = getValues("odometerReading.images");
              setValue("odometerReading.images", [...oldImages, imgUrl]);
            }}
          />

          <InputField
            control={control}
            error=""
            label="Enter Odometer Reading"
            name="odometerReading.value"
            placeholder="Odometer Reading"
            type="text"
          />
        </div>
        <div>
          <div className="flex flex-wrap gap-4">
            {watch("odometerReading.images")?.map((el, index) => {
              return (
                <Image key={index} src={el} alt="odomterreading" width={200} />
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div>
          <h3 className="text-lg font-bold">Odometer Reading</h3>
          <p>Please Enter Current Meter Reading</p>
        </div>
        <div className="flex gap-4 items-end my-4">
          <CameraInputField
            addImage={(imgUrl: string) => {
              const oldImages = getValues("fuelQuantity.images");
              setValue("fuelQuantity.images", [...oldImages, imgUrl]);
            }}
          />
        </div>
        <div>
          <div className="flex flex-wrap gap-4">
            {watch("fuelQuantity.images")?.map((el, index) => {
              return (
                <Image key={index} src={el} alt="odomterreading" width={200} />
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 mt-4">
        <Button disabled={loading} htmlType="submit" type="primary">
          Save & Continue
        </Button>
      </div>
    </form>
  );
};

export default OdometerAndFuel;
