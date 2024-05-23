"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import InputField from "@/app/components/Input/InputField";
import SelectField from "@/app/components/Input/SelectField";
import TextAreaField from "@/app/components/Input/TextArea";
import Loader from "@/app/components/Loader";
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
import { useRouter } from "next/navigation";

type Props = {
  employeeId: string;
};

const UpdateEmployeeForm: React.FC<Props> = ({ employeeId }) => {
  const [employee, setEmployee] = useState<TEmployeeDetails | null>(null);
  const [loading, setLoading] = useState(true);
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
      setValue("firstName", employee?.firstName || "");
      setValue("lastName", employee?.lastName || "");
      setValue("email", employee?.email);
      setValue("contactNumber", employee?.contactNumber);
      setValue("roleId", employee.roleId._id);
      setValue("address", employee?.additionalDetails?.address || "");
    }
  }, [employee, setValue]);

  useEffect(() => {
    (async function () {
      try {
        const response = await getAllEmployeeRole();
        const employeeRoles = response.data as TRole[];
        setEmployeeRoleOption(() => {
          return employeeRoles.map((el) => ({
            value: el._id,
            label: el.role.split("_").join(" ").toUpperCase(),
          }));
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (employeeId) {
      getEmployeeData(employeeId);
    }
  }, [employeeId]);

  const getEmployeeData = async (id: string) => {
    try {
      setLoading(true);
      const result = await getEmployeeByEmployeeId(id, "full");

      if (result?.success) {
        setEmployee(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: TUpdateEmployee) => {
    try {
      setLoading(true);
      const result = await updateEmployeeDetails(employeeId, data);

      if (result) {
        router.push(`/employee/dashboard/employee/`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const employeeUpdateFields = [
    {
      name: "firstName",
      error: errors?.firstName?.message || "",
      label: "First Name",
      type: "text",
      control,
      placeholder: "John",
    },
    {
      name: "lastName",
      error: errors?.lastName?.message || "",
      label: "Last Name",
      type: "text",
      control,
      placeholder: "Doe",
    },
    {
      name: "email",
      error: errors?.email?.message || "",
      label: "Email",
      type: "email",
      control,
      placeholder: "example@example.com",
    },
    {
      name: "contactNumber",
      error: errors?.contactNumber?.message || "",
      label: "Contact Number",
      type: "text",
      control,
      placeholder: "123-456-7890",
    },
    {
      name: "roleId",
      error: errors?.roleId?.message || "",
      label: "Role",
      type: "select",
      control,
      placeholder: "Role",
    },
    {
      name: "address",
      error: errors?.address?.message || "",
      label: "Address",
      type: "textarea",
      control,
      placeholder: "Address",
    },
  ];

  return (
    <div>
      {!loading ? (
        employee ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              {employeeUpdateFields.map((field, i) => {
                switch (field.type) {
                  case "select":
                    return (
                      <SelectField
                        key={i}
                        {...field}
                        mode="single"
                        options={employeeRoleOption}
                        setValue={setValue}
                        defaultValue={employee.roleId._id}
                      />
                    );
                  case "textarea":
                    return <TextAreaField key={i} {...field} />;
                  default:
                    return <InputField key={i} {...field} />;
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
          <>No Record Found</>
        )
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
