import CameraInputField from "@/app/components/Input/CameraInputField";
import InputField from "@/app/components/Input/InputField";
import {
  TWorkOrderFuelQuantity,
  TWorkOrderOdometerReading,
} from "@/app/types/work-order";
import {
  TWorkOrderOdometerAndFuelCreateSchema,
  TworkorderPrepare,
  workOrderOdometerAndFuelCreateSchema,
} from "@/app/validators/workorder";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Typography } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {};

const OdometerAndFuel = (props: Props) => {
  const [odometerAndFuelData, setOdoMeterAndFuelData] = useState<{
    odometerReading: TWorkOrderOdometerReading;
    fuelQuantity: TWorkOrderFuelQuantity;
  }>({
    odometerReading: {
      image: "",
    },
    fuelQuantity: {
      image: "",
    },
  });

  const {
    control,
    setError,
    formState: { errors },
  } = useForm<TWorkOrderOdometerAndFuelCreateSchema>({
    resolver: yupResolver(workOrderOdometerAndFuelCreateSchema),
  });

  return (
    <div>
      <div>
        <div>
          <h3 className="text-lg font-bold">Odometer Reading</h3>
          <p>Please Enter Current Meter Reading</p>
        </div>
        <div className="flex gap-4 items-end my-4">
          <CameraInputField
            addImage={(url: string) => {
              console.log(url);
              setOdoMeterAndFuelData((prv) => {
                return {
                  ...prv,
                  odometerReading: {
                    image: url,
                  },
                };
              });
            }}
          />

          <InputField
            control={control}
            error=""
            label="Enter Odometer Reading"
            name="odometerReading"
            placeholder="Odometer Reading"
            type="text"
          />

          {/* <div className="flex justify-start flex-col relative">
                        <Typography.Title className="text-start" level={5}>
                            Odometer Reading
                        </Typography.Title>
                        <Input
                            maxLength={7}
                            placeholder="Enter Odometer Reading"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={value}
                            style={{ width: 160 }}
                        />
                        {inputError && (
                            <p className="absolute bottom-[-25px] left-0 text-red-500">
                                {inputError}
                            </p>
                        )}
                    </div> */}
        </div>
      </div>

      <div>
        <div>
          <h3 className="text-lg font-bold">Odometer Reading</h3>
          <p>Please Enter Current Meter Reading</p>
        </div>
        <div className="flex gap-4 items-end my-4">
          <CameraInputField
            addImage={(url: string) => {
              console.log(url);
            }}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button type="primary">Save</Button>
      </div>
    </div>
  );
};

export default OdometerAndFuel;
