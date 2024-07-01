"use client";
import InputField from "@/app/components/Input/InputField";
import SelectField from "@/app/components/Input/SelectField";
import { createServiceCategory } from "@/app/services/operations/appointment/service-category";
import {
  ServiceCategorySchema,
  TServiceCategorySchema,
} from "@/app/validators/service-plans";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const options = [
  { value: "car", label: "CAR" },
  { value: "truck", label: "TRUCK" },
];
const CreateCategory = () => {
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<TServiceCategorySchema>({
    resolver: yupResolver(ServiceCategorySchema),
    defaultValues: {
      isActive: true,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: TServiceCategorySchema) => {
    await createServiceCategory(data.name, data.isActive, data.vehicle_type);

    router.push("/employee/dashboard/servicePlan/category");
  };

  const categoryFields = [
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
      name: "isActive",
      label: "Active",
      type: "checkbox",
      error: errors?.isActive?.message,
    },
  ];

  return (
    <>
      {/* <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl">
                <h2 className="text-xl font-semibold">Create Category</h2>
            </div> */}
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-md"
        >
          {categoryFields.map((item, index) => (
            <div key={index} className="mb-4">
              {item.type === "text" ? (
                <InputField
                  label={item.label}
                  type={item.type}
                  control={item.control}
                  placeholder={item.placeholder}
                  error={item.error}
                  name={item.name}
                />
              ) : item.type === "select" ? (
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
              ) : (
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox {...field} checked={field.value}>
                        Active
                      </Checkbox>
                    );
                  }}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
