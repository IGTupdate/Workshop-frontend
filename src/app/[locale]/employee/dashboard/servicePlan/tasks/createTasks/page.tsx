"use client";
import InputField from "@/app/components/Input/InputField";
import SelectField from "@/app/components/Input/SelectField";
import {
  ServiceTaskValidatorSchema,
  TServiceTaskValidatorSchema,
} from "@/app/validators/service-plans";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { createServiceTask } from "../../../../../../services/operations/appointment/service-tasks";
import { useRouter } from "next/navigation";

const options = [
  { value: "car", label: "CAR" },
  { value: "truck", label: "TRUCK" },
];
const Page = () => {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<TServiceTaskValidatorSchema>({
    resolver: yupResolver(ServiceTaskValidatorSchema),
  });

  const tasksFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Category Name",
      error: errors?.name?.message,
      control: control,
    },
    {
      name: "vehicle_type",
      label: "Vehicle Type",
      type: "select",
      placeholder: "Enter Vehicle Type",
      error: errors?.vehicle_type?.message,
      control: control,
    },
    {
      name: "duration",
      label: "Duration",
      type: "number",
      placeholder: "Enter Duration",
      error: errors?.duration?.message,
      control: control,
    },
    {
      name: "cost",
      label: "Cost",
      type: "number",
      placeholder: "Enter Cost",
      error: errors?.cost?.message,
      control: control,
    },
  ];

  const onSubmit = async (data: TServiceTaskValidatorSchema) => {
    await createServiceTask(data);
    router.push("/employee/dashboard/servicePlan/tasks");
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-md"
      >
        {tasksFields?.map((item, index) => {
          return (
            <div key={index} className="mb-4">
              {item?.type === "text" || item.type === "number" ? (
                <InputField
                  label={item.label}
                  type={item.type}
                  control={item.control}
                  placeholder={item.placeholder}
                  error={item.error}
                  name={item.name}
                />
              ) : (
                <SelectField
                  mode={"single"}
                  defaultValue={options[0].value}
                  name={item.name}
                  label={item.label}
                  placeholder={item.placeholder}
                  error={errors?.vehicle_type?.message}
                  control={item.control}
                  setValue={setValue}
                  options={options}
                />
              )}
            </div>
          );
        })}

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
