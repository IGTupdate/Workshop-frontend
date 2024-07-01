"use client";
import InputField from "@/app/components/Input/InputField";
import SelectField from "@/app/components/Input/SelectField";
import Loader from "@/app/components/Loader";
import {
  getServiceTasks,
  updateServiceTask,
} from "@/app/services/operations/appointment/service-tasks";
import {
  ServiceTaskValidatorSchema,
  TServiceTaskValidatorSchema,
} from "@/app/validators/service-plans";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const options = [
  { value: "car", label: "CAR" },
  { value: "truck", label: "TRUCK" },
];
const UpdateTasks = () => {
  const [tasks, setTasks] = useState<TServiceTaskValidatorSchema>();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TServiceTaskValidatorSchema>({
    resolver: yupResolver(ServiceTaskValidatorSchema),
  });

  useEffect(() => {
    getSingleTasks();
  }, [params.tasksId]);

  const getSingleTasks = async () => {
    setLoading(true);
    try {
      const result = await getServiceTasks();
      if (result?.length > 0) {
        const filterData = result.filter(
          (item: { _id: string | string[] }) => item._id === params.tasksId,
        );
        setTasks(filterData[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tasks) {
      setValue("name", tasks?.name);
      setValue("vehicle_type", tasks?.vehicle_type);
      setValue("duration", tasks?.duration);
      setValue("cost", tasks?.cost);
    }
  }, [tasks, setValue, params.tasksId]);

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
    await updateServiceTask(params.tasksId, data);
    router.push("/employee/dashboard/servicePlan/tasks");
  };
  return (
    <div>
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
                Update
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateTasks;
