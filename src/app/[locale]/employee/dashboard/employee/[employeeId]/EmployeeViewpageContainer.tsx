"use client";

import DescriptionItem from "@/app/components/DescriptionItem.tsx";
import { TEmployeeDetails } from "@/app/types/employee";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  employee: TEmployeeDetails;
};

function EmployeeViewpageContainer({ employee }: Props) {
  const {
    firstName,
    lastName,
    email,
    contactNumber,
    roleId,
    status,
    additionalDetails,
  } = employee;

  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.push(`${employee._id}/update`)}>
        Update
      </Button>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <DescriptionItem title="FirstName" content={firstName} />
        <DescriptionItem title="LastName" content={lastName} />
        <DescriptionItem title="Email" content={email} />
        <DescriptionItem title="Phone" content={contactNumber} />
        {/* <DescriptionItem title='Password' content='Puneet' /> */}
        <DescriptionItem title="Role" content={roleId.role} />
        <DescriptionItem title="Address" content="Indore MP" />
      </div>
    </>
  );
}

export default EmployeeViewpageContainer;
