import InputField from "@/app/components/Input/InputField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreateEmployeeFormContainer from "./CreateEmployeeFormContainer";
import { Button } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createEmployeeYupSchema,
  TCreateEmployee,
} from "@/app/validators/employee";
import { createEmployee } from "@/app/services/operations/employee/employee";
import toast from "react-hot-toast";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { useRouter } from "next/navigation";

type Props = {};

const CreateEmployeeContainer = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TCreateEmployee>({
    resolver: yupResolver(createEmployeeYupSchema),
  });

  const handleOnSubmit = async (data: TCreateEmployee) => {
    try {
      // console.log(data);
      setLoading(true);
      const response = await createEmployee(data);
      toast.success(response?.message || "-");

      router.push(`/employee/dashboard/employee`);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <CreateEmployeeFormContainer
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <div className="mt-4 flex justify-end">
          <Button
            loading={loading}
            disabled={loading}
            htmlType="submit"
            type="primary"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployeeContainer;
