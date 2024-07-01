"use client";
import { TVehicleSchema, VehicleSchema } from "@/app/validators/vehicle-entry";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, DatePicker, Form, Input } from "antd";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import InputField from "@/app/components/Input/InputField";
import DateAndTimePicker from "@/app/components/Input/DateAndTimePicker";

type props = {
  onSubmit: any;
};

const CreateEntryVehicle = ({ onSubmit }: props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TVehicleSchema>({
    resolver: yupResolver(VehicleSchema),
  });

  return (
    <Form onFinish={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <DateAndTimePicker
          name={"entryTime"}
          label={"Entry Time"}
          control={control}
          setValue={setValue}
          disabledDates={false}
        />
      </div>

      <div className="mb-4">
        <InputField
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

export default CreateEntryVehicle;
