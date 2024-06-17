"use client";
import { getAllServicePlans } from "@/app/services/operations/appointment/service-plans";
import { useAppSelector } from "@/app/store/reduxHooks";
import { Button } from "antd";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ServicePlansViewPageContainer from "./__component/ServicePlansViewPageContainer";

// import * as yup from "yup";

// export const ServiceCategoryValidatorSchema = yup.object({
//   name: yup.string().required(),
//   isActive: yup.boolean(),
//   vehicle_type: yup.string(),
// });

// export const ServiceTaskValidatorSchema = yup.object({
//   name: yup.string().min(1).max(100).required(),
//   vehicle_type: yup.string(),
//   duration: yup.number(),
//   cost: yup.number(),
// });



const Page = () => {
  const dispatch = useDispatch()
  const { servicePlansLoading, servicePlansData } = useAppSelector(
    (state) => state.servicePlan,
  );
 
  useEffect(()=>{
    dispatch(getAllServicePlans())
  },[])


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
