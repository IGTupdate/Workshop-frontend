"use client";
import Loader from "@/app/components/Loader";
import { getAllEmployeeRole } from "@/app/services/operations/employee/employee";
import { Button } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import RoleCards from "./__component/RoleCards";
import Watermark from "@/app/components/Text/WatermarkText";

type TRole = {
  role: string;
  _id: string;
  createdAt: string;
};

const Page = () => {
  const [roles, setRoles] = useState<TRole[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllEmployeeRoles();
  }, []);

  const getAllEmployeeRoles = async () => {
    setLoading(true);
    try {
      const result = await getAllEmployeeRole();
      if (result.success === true) {
        setRoles(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold">Manage Roles</h2>
          {/* <Link href={`/employee/dashboard/employee/create`}>
                    <Button type="primary">Create Roles</Button>
                </Link> */}
        </div>
        {loading ? (
          <div
            style={{ height: "calc(100vh - 300px)" }}
            className="flex justify-center items-center w-full"
          >
            <Loader />
          </div>
        ) : (
          <>
            {roles?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {roles?.map((item, index) => (
                  <RoleCards
                    key={index}
                    role={item.role}
                    id={item._id}
                    createdAt={item.createdAt}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{ height: "calc(100vh - 300px)" }}
                className="relative w-full"
              >
                <Watermark text="Roles Not Found" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
