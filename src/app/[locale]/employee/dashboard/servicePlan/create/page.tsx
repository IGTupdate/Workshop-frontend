"use client";
import InputField from "@/app/components/Input/InputField";
import InputFieldWithButton from "@/app/components/Input/InputFieldWithButton";
import SelectCreateField from "@/app/components/Input/SelectCreateField";
import SelectField from "@/app/components/Input/SelectField";
import TextAreaField from "@/app/components/Input/TextArea";
import {
  getServiceCategory,
  getServiceCategoryByVehicle,
} from "@/app/services/operations/appointment/service-category";
import { createServicePlans } from "@/app/services/operations/appointment/service-plans";
import {
  getServiceTasks,
  getServiceTasksByVehicle,
} from "@/app/services/operations/appointment/service-tasks";
import {
  ServicePlanValidatorSchema,
  TServicePlanValidatorSchema,
} from "@/app/validators/service-plans";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  Divider,
  Input,
  InputRef,
  Select,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";

const options = [
  { value: "car", label: "CAR" },
  { value: "truck", label: "TRUCK" },
];
const parts = [
  { value: "tyer", label: "Tyer" },
  { value: "break", label: "Break" },
];

const CreateServicePlans: React.FC = () => {
  const [category, setCategory] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [tasks, setTasks] = useState<{ value: string; label: string }[]>([]);
  const {
    register,
    control,
    formState: { errors },
    getValues,
    watch,
    handleSubmit,
    setValue,
  } = useForm<TServicePlanValidatorSchema>({
    resolver: yupResolver(ServicePlanValidatorSchema),
    defaultValues: {
      isActive: true, // Ensure the default value is set here
    },
  });

  const router = useRouter();
  const vehicle_type = watch("vehicle_type");

  useEffect(() => {
    getData(vehicle_type);
    setValue("category", "");
    setValue("tasks", []);
  }, [vehicle_type]);

  const getData = async (vehicleType: string | undefined) => {
    try {
      const [categorData, tasksData] = await Promise.all([
        getServiceCategoryByVehicle(vehicleType),
        getServiceTasksByVehicle(vehicleType),
      ]);

      if (categorData) {
        const categoryData = categorData.map((item: any) => ({
          value: item.name,
          label: item.name,
        }));

        setCategory(categoryData);
      }

      if (tasksData) {
        const taskData = tasksData.map((item: any) => ({
          value: item._id,
          label: item.name,
        }));

        setTasks(taskData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSubmit = async (data: TServicePlanValidatorSchema) => {
    //  todo want to fix price type become a number
    // duration type become a number
    // descriptions type become string

    const newData = {
      ...data,
      price: Number(data.price),
      duration: Number(data.duration),
    };

    const result = await createServicePlans(newData);

    if (result?.status === 201) {
      router.push("/employee/dashboard/servicePlan");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
        <InputField
          name={"name"}
          label={"Name"}
          placeholder={"Enter Service Plan Name"}
          type={"text"}
          error={errors.name?.message}
          control={control}
        />

        <SelectField
          mode={"single"}
          name={"vehicle_type"}
          label={"Vehicle Type"}
          placeholder={"Select Vehicale Type"}
          control={control}
          error={""}
          setValue={setValue}
          defaultValue={options[0].value}
          options={options}
        />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
        <InputField
          name={"price"}
          label={"Price"}
          placeholder={"Enter Service Plan Price"}
          type={"number"}
          error={errors.price?.message}
          control={control}
        />
        <InputField
          name={"duration"}
          label={"Duration"}
          placeholder={"Enter Service Plan Duration"}
          type={"number"}
          error={errors.duration?.message}
          control={control}
        />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
        {/* <SelectCreateField name="category" mode="single" control={control} setValue={setValue} label={"Category"} placeholder={"Select Category"} options={category} /> */}

        <SelectField
          mode={"single"}
          name={"category"}
          label={"category"}
          placeholder={"Select category"}
          control={control}
          error={errors.category?.message}
          setValue={setValue}
          options={category}
        />

        <SelectField
          mode={"multiple"}
          name={"tasks"}
          label={"Tasks"}
          placeholder={"Select Tasks"}
          control={control}
          error={errors.tasks?.message}
          setValue={setValue}
          options={tasks}
        />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
        {/* <SelectField mode={"multiple"} name={"parts"} label={"Parts"} placeholder={"Select parts"} control={control} error={errors.parts?.message} setValue={setValue} options={parts} /> */}
        <InputField
          name={"remarks"}
          label={"Remarks"}
          placeholder={"Enter Remarks"}
          type={"text"}
          error={errors.remarks?.message}
          control={control}
        />
        <TextAreaField
          name={"description"}
          label={"Description"}
          placeholder={"Enter description"}
          error={errors.description?.message}
          control={control}
        />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
        {/* <InputField name={"isActive"} label={"Active"} type={"checkbox"} error={errors.isActive?.message} control={control} placeholder={undefined} /> */}
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
      </div>

      <div className="flex justify-end mt-4">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateServicePlans;
