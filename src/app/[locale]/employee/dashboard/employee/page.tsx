"use client";
import { Button } from "antd";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import EmployeesViewPageContainer from "./__components/EmployeesViewPageContainer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { removeQueryParams, setQueryParams } from "@/app/utils/helper";
import useAbility from "@/app/__hooks/useAbility";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
import UnAuthorized from "@/app/components/UnAuthorized/UnAuthorized";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const ability = useAbility();

  const handleClearFilter = () => {
    router.push(pathname);
  };

  console.log(ability && ability.can(casl_action.get, casl_subject.employee));

  return (
    <div>
      {ability && ability.can(casl_action.get, casl_subject.employee) ? (
        <div>
          <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl">
            <h2 className="text-xl font-semibold">Manage Employee</h2>
            {ability &&
              ability.can(casl_action.create, casl_subject.employee) && (
                <Link href={`/employee/dashboard/employee/create`}>
                  <Button type="primary">Create Employee</Button>
                </Link>
              )}
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
      ) : (
        <UnAuthorized />
      )}
    </div>
  );
};

export default Page;
