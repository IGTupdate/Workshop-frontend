"use client";
import { getAllServicePlans } from "@/app/services/operations/appointment/service-plans";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { Button } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import ServicePlansViewPageContainer from "./__component/ServicePlansViewPageContainer";

const Page = () => {
  const dispatch = useAppDispatch();
  const { servicePlansLoading, servicePlansData } = useAppSelector(
    (state) => state.servicePlan,
  );

  useEffect(() => {
    if (servicePlansLoading) {
      dispatch(getAllServicePlans());
    }
  }, [servicePlansLoading]);

  return (
    <>
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl">
        <h2 className="text-xl font-semibold">Service Plans</h2>
        <Link href={`/employee/dashboard/servicePlan/create`}>
          <Button type="primary">Create Plans</Button>
        </Link>
      </div>

      <div>
        <ServicePlansViewPageContainer servicePlans={servicePlansData} />
      </div>
    </>
  );
};

export default Page;
