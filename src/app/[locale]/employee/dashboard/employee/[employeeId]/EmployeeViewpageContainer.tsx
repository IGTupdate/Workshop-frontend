"use client";

import DescriptionItem from "@/app/components/DescriptionItem.tsx";
import { TEmployeeDetails } from "@/app/types/employee";
import React, { useEffect, useState } from "react";

type Props = {
  employee: TEmployeeDetails;
};

function EmployeeViewpageContainer({ employee }: Props) {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
      <DescriptionItem
        title="FirstName"
        content={employee?.firstName ? employee?.firstName : "_"}
      />
      <DescriptionItem
        title="LastName"
        content={employee?.lastName ? employee?.lastName : "_"}
      />
      <DescriptionItem
        title="Email"
        content={employee?.email ? employee?.email : "_"}
      />
      <DescriptionItem
        title="Phone"
        content={employee?.contactNumber ? employee?.contactNumber : "_"}
      />
      {/* <DescriptionItem title='Password' content='Puneet' /> */}
      <DescriptionItem
        title="Role"
        content={`${typeof employee?.roleId !== "string" && employee?.roleId?.role?.split("_")[0]} ${typeof employee?.roleId !== "string" && employee?.roleId?.role?.split("_")[1] != undefined ? employee?.roleId?.role?.split("_")[1] : ""}`}
      />
      <DescriptionItem title="Address" content="Indore MP" />
    </div>
  );
}

export default EmployeeViewpageContainer;
