"use client";
import React, { useEffect, useState } from "react";
import EmployeeViewpageContainer from "./EmployeeViewpageContainer";
import { TEmployeeDetails } from "@/app/types/employee";
import { getEmployeeByEmployeeId } from "@/app/services/operations/employee/employee";
import Loader from "@/app/components/Loader";
import Watermark from "@/app/components/Text/WatermarkText";
import { Button } from "antd";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    employeeId: string;
  };
};

const Page = (props: Props) => {
  const [employee, setEmployee] = useState<TEmployeeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (props.params.employeeId) {
      getEmployeeData(props.params.employeeId);
    }
  }, [props.params.employeeId]);

  const getEmployeeData = async (employeeId: string) => {
    try {
      setLoading(true);
      const result = await getEmployeeByEmployeeId(employeeId, "full");

      if (result?.success === true) {
        setEmployee(() => {
          return {
            ...result?.data,
          };
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="flex justify-center items-center"
        >
          <Loader />
        </div>
      ) : employee ? (
        <div className="p-4 bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Employee Details</h2>
            <Button onClick={() => router.push(`${employee._id}/update`)}>
              Update
            </Button>
          </div>
          <div>
            <EmployeeViewpageContainer employee={employee} />
          </div>
        </div>
      ) : (
        <div className="relative py-8">
          <Watermark text="Employee data not available" />
        </div>
      )}
    </>
  );
};

export default Page;
