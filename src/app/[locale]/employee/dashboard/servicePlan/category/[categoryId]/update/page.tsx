"use client";
import InputField from "@/app/components/Input/InputField";
import SelectField from "@/app/components/Input/SelectField";
import Loader from "@/app/components/Loader";
import {
  createServiceCategory,
  getServiceCategory,
  updateServiceCategory,
} from "@/app/services/operations/appointment/service-category";
import { IServiceCategory } from "@/app/types/service";
import {
  ServiceCategorySchema,
  TServiceCategorySchema,
} from "@/app/validators/service-plans";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const options = [
  { value: "car", label: "CAR" },
  { value: "truck", label: "TRUCK" },
];
const UpdateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<IServiceCategory[]>([]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TServiceCategorySchema>({
    resolver: yupResolver(ServiceCategorySchema),
  });

  const parmas = useParams();
  const router = useRouter();

  // console.log(parmas, "params")

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    setLoading(true);
    try {
      const serviceCategoryIds = parmas?.categoryId;
      const result = await getServiceCategory();

      if (result?.length > 0) {
        const filterData = result?.filter(
          (item: { _id: string | string[] }) => item._id === serviceCategoryIds,
        );
        setCategory(filterData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      setValue("name", category[0]?.name);
      setValue("vehicle_type", category[0]?.vehicle_type);
      setValue("isActive", category[0]?.isActive);
    }
  }, [category, setValue]);

  const onSubmit = async (data: TServiceCategorySchema) => {
    await updateServiceCategory(
      category[0]?._id,
      data.name,
      data.isActive,
      data.vehicle_type,
    );

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
      {loading ? (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : (
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
                Update
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateCategory;
