"use client";
import DateAndTimePicker from "@/app/components/Input/DateAndTimePicker";
import InputField from "@/app/components/Input/InputField";
import { VehicleExit } from "@/app/services/operations/appointment/vehicle";
import {
  TVehicleExitSchema,
  VehicleExitSchema,
} from "@/app/validators/vehicle-entry";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  registrationNumber: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getAllVehicleEntry: () => Promise<void>;
};

const CreateExitVehicle = ({
  registrationNumber,
  setIsModalOpen,
  getAllVehicleEntry,
}: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TVehicleExitSchema>({
    resolver: yupResolver(VehicleExitSchema),
    defaultValues: {
      registrationNumber: registrationNumber,
    },
  });

  const onSubmit = async (data: TVehicleExitSchema) => {
    const result = await VehicleExit(data);
    if (result?.success === true) {
      getAllVehicleEntry();
      setIsModalOpen(false);
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <DateAndTimePicker
          name={"exitTime"}
          label={"Exit Time"}
          control={control}
          setValue={setValue}
          disabledDates={true}
        />
      </div>

      <div className="mb-4">
        <InputField
          disabled={true}
          name={"registrationNumber"}
          label={"Registration Number"}
          placeholder={"Enter Registration Number"}
          type={"text"}
          error={errors.registrationNumber?.message}
          control={control}
        />
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateExitVehicle;
