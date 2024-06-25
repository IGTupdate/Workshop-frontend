"use client";
import {
  getAccess,
  getAccessByRoleId,
} from "@/app/services/operations/auth/customerAuth";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ShowAllRoles from "../__component/ShowAllRoles";
import Watermark from "@/app/components/Text/WatermarkText";

type Access = {
  action: string;
  fields: string[];
  role: string;
  _id: string;
  resource: string;
};

const Page = () => {
  const [action, setAction] = useState<Access[]>([]);
  const params = useParams();

  useEffect(() => {
    getAllAccessByRoleId();
  }, [params.roleId]);

  const getAllAccessByRoleId = async () => {
    const query = `role=${params.roleId}`;
    const result = await getAccessByRoleId(query);
    if (result.success === true) {
      setAction(result.data);
    }
    console.log(result, "result");
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl">
        <h2 className="text-xl font-semibold">All Access</h2>
        {/* <Link href={`/employee/dashboard/employee/create`}>
                    <Button type="primary">Create Roles</Button>
                </Link> */}
      </div>
      {action?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {action.map((item, index) => (
            <ShowAllRoles
              key={index}
              action={item.action}
              resource={item.resource}
              role={item.role}
              id={item._id}
            />
          ))}
        </div>
      ) : (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="relative w-full"
        >
          <Watermark text="Access Not Found" />
        </div>
      )}
    </div>
  );
};

export default Page;
