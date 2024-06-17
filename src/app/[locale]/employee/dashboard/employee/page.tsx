"use client";
import { Button } from "antd";
import Link from "next/link";
import React, { useCallback } from "react";
import EmployeesViewPageContainer from "./__components/EmployeesViewPageContainer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { removeQueryParams, setQueryParams } from "@/app/utils/helper";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClearFilter = () => {
    router.push(pathname);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl">
        <h2 className="text-xl font-semibold">Manage Employee</h2>
        <Link href={`/employee/dashboard/employee/create`}>
          <Button type="primary">Create Employee</Button>
        </Link>
      </div>

      <div className="mb-4 flex justify-end">
        <div>
          <Button type="primary" onClick={handleClearFilter}>
            Clear Filter
          </Button>
        </div>
      </div>
      <div>
        <EmployeesViewPageContainer />
      </div>
    </div>
  );
};

export default Page;
