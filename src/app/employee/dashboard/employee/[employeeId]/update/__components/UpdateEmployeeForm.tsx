"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";

import InputField from "@/app/components/Input/InputField";
import SelectField from "@/app/components/Input/SelectField";
import TextAreaField from "@/app/components/Input/TextArea";
import {
  getAllEmployeeRole,
  getEmployeeByEmployeeId,
  updateEmployeeDetails,
} from "@/app/services/operations/employee/employee";
import { TEmployeeDetails, TRole } from "@/app/types/employee";
import {
  TUpdateEmployee,
  updateEmployeeYupSchema,
} from "@/app/validators/employee";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";

type Props = {
  employeeId: string;
};

const UpdateEmployeeForm = (props: Props) => {
  const [employee, setEmployee] = useState<TEmployeeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [employeeRoleOption, setEmployeeRoleOption] = useState<
    { value: string; label: string }[]
  >([]);
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<TUpdateEmployee>({
    resolver: yupResolver(updateEmployeeYupSchema),
  });
  const router = useRouter();

  useEffect(() => {
    if (employee) {
      setValue("firstName", employee?.firstName);
      setValue("lastName", employee?.lastName);
      setValue("email", employee?.email);
      setValue("contactNumber", employee?.contactNumber);
      setValue(
        "roleId",
        typeof employee?.roleId === "string"
          ? employee.roleId
          : employee.roleId._id,
      );
      setValue("address", employee?.address || "");
    }
  }, [employee]);

  useEffect(() => {
    (async function () {
      try {
        const response = await getAllEmployeeRole();
        const employeeRoles = response.data as TRole[];
        setEmployeeRoleOption(() => {
          return employeeRoles.map((el) => {
            return {
              value: el._id,
              label: el.role,
            };
          });
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (props.employeeId) {
      getEmployeeData(props.employeeId);
    }
  }, [props.employeeId]);

  const getEmployeeData = async (employeeId: string) => {
    try {
      setLoading(true);
      const result = await getEmployeeByEmployeeId(employeeId, "full");

      if (result?.success === true) {
        setEmployee(result?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const employee_update_fields = [
    {
      name: "firstName",
      error: errors?.firstName?.message || "",
      label: "First Name",
      type: "text",
      control: control,
      placeholder: "John",
    },
    {
      name: "lastName",
      error: errors?.lastName?.message || "",
      label: "Last Name",
      type: "text",
      control: control,
      placeholder: "Doe",
    },
    {
      name: "email",
      error: errors?.email?.message || "",
      label: "Email",
      type: "email",
      control: control,
      placeholder: "example@example.com",
    },
    {
      name: "contactNumber",
      error: errors?.contactNumber?.message || "",
      label: "Contact Number",
      type: "text",
      control: control,
      placeholder: "123-456-7890",
    },
    {
      name: "roleId",
      error: errors?.roleId?.message || "",
      label: "Role",
      type: "select",
      control: control,
      placeholder: "Role",
    },
    {
      name: "address",
      error: errors?.address?.message || "",
      label: "Address",
      type: "textarea",
      control: control,
      placeholder: "Address",
    },
  ];

  const onSubmit = async (data: TUpdateEmployee) => {
    try {
      setLoading(true);
      const result = await updateEmployeeDetails(props?.employeeId, data);

      if (result) {
        setLoading(false);
        router.push(`/employee/dashboard/employee/`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {employee ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            {employee_update_fields.map((field, index) => {
              switch (field.type) {
                case "select":
                  return (
                    <SelectField
                      key={index}
                      {...field}
                      mode="single"
                      options={employeeRoleOption}
                      setValue={setValue}
                      defaultValue={
                        typeof employee?.roleId === "string"
                          ? employee.roleId
                          : employee.roleId._id
                      }
                    />
                  );
                case "textarea":
                  return <TextAreaField key={index} {...field} />;
                default:
                  return <InputField key={index} {...field} />;
              }
            })}
          </div>

          <div className="flex justify-end mt-8">
            <Button
              loading={loading}
              disabled={loading}
              htmlType="submit"
              type="primary"
            >
              Update
            </Button>
          </div>
        </form>
      ) : (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="flex justify-center items-center"
        >
          <Loader />
        </div>
      )}
    </div>
  );
};

export default UpdateEmployeeForm;
