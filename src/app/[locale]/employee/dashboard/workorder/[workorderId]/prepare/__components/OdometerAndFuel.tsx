import CameraInputField from "@/app/components/Input/CameraInputField";
import InputField from "@/app/components/Input/InputField";
import ErrorText from "@/app/components/Text/ErrorText";
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
import { IoClose } from "react-icons/io5";

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
    setLoading(true);
    try {
      const result = await updateWorkOrder(
        props.workOrder?._id || "",
        data as Partial<TWorkOrder>,
      );
      if (result?.success === true) {
        toast.success("Images Upload Successfully");
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
          <p>Please Enter Or Upload Current Meter Reading</p>
        </div>
        <div className="flex gap-4 items-end my-4">
          <CameraInputField
            addImage={(imgUrl: string) => {
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
            type="number"
          />
        </div>
        <div>
          <div className="flex flex-wrap gap-4">
            {watch("odometerReading.images")?.map((el, index) => {
              return (
                <div key={index} className="relative">
                  <Image src={el} alt="odomterreading" width={200} />
                  <div className="absolute right-[-12px] top-[-12px] h-12 w-12 flex justify-center items-center rounded-full shadow-topDivSmall cursor-pointer">
                    <IoClose
                      onClick={() => {
                        const oldImages = getValues(
                          "odometerReading.images",
                        ).filter((_, ind) => {
                          return ind !== index;
                        });
                        setValue("odometerReading.images", oldImages);
                      }}
                      size={25}
                      color="white"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* error */}
        <ErrorText
          text={
            errors.odometerReading?.root?.message ||
            errors.odometerReading?.message ||
            ""
          }
        />
      </div>

      <div className="mt-6">
        <div>
          <h3 className="text-lg font-bold">Fuel Reading</h3>
          <p>Please Upload Current Fuel Reading</p>
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
                <div key={index} className="relative">
                  <Image src={el} alt="fuelQuantity" width={200} />
                  <div className="absolute right-[-12px] top-[-12px] h-12 w-12 flex justify-center items-center rounded-full shadow-topDivSmall cursor-pointer">
                    <IoClose
                      onClick={() => {
                        const oldImages = getValues(
                          "fuelQuantity.images",
                        ).filter((_, ind) => {
                          return ind !== index;
                        });
                        setValue("fuelQuantity.images", oldImages);
                      }}
                      size={25}
                      color="white"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ErrorText
          text={
            errors.fuelQuantity?.root?.message ||
            errors.fuelQuantity?.message ||
            ""
          }
        />
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
