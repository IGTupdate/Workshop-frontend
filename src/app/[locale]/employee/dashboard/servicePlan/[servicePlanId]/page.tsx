"use client";
import ServicePlans from "@/app/[locale]/dashboard/appointment/book/__components/ServicePlans";
import { getSingleServicePlans } from "@/app/services/operations/appointment/service-plans";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [servicePlan, setServicePlan] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params?.servicePlanId) {
      getServicePlans(params?.servicePlanId);
    }
  }, [params?.servicePlanId]);

  const getServicePlans = async (id: string | string[]) => {
    const result = await getSingleServicePlans(id);

    if (result?.length > 0) {
      const filterData = result?.filter(
        (item: { _id: string | string[] }) =>
          item._id === params?.servicePlanId,
      );
      setServicePlan(filterData);
      console.log(filterData, "filterData");
    }
  };

  return (
    <div>
      <ServicePlans plan={servicePlan[0]} />
    </div>
  );
};

export default Page;
