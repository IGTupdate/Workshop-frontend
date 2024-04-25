"use client";
import { getAllServicePlans } from "@/app/services/operations/appointment/service-plans";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { TAppointmentBook } from "@/app/types/appointment";
import { Button, Tabs } from "antd";
import { useEffect, useState } from "react";
import ServicePlans from "./ServicePlans";
import { getAllServicePlansCategoryWise } from "../../__utils/GetServicePlansSegregatedData";
import { TSegregatedServiceData } from "@/app/types/service";

type Props = {
  appointmentBookingData: TAppointmentBook
  setAppointmentBookingData: React.Dispatch<React.SetStateAction<TAppointmentBook>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const ServicePlanSelection: React.FC<Props> = (props) => {
  const { servicePlansLoading, servicePlansData } = useAppSelector((state) => state.servicePlan);
  const dispatch = useAppDispatch();
  const [servicePlansDataCategoryWise, setServicePlansDataCategoryWise] = useState<TSegregatedServiceData | null>(null)

  useEffect(() => {
    (async function (){
      const result = await getAllServicePlansCategoryWise(servicePlansData)
      setServicePlansDataCategoryWise(result)
    }())
    
  },[servicePlansData])

  useEffect(() => {
    if (localStorage.getItem('selectedPlans')) localStorage.removeItem('selectedPlans')
  }, []);

  useEffect(() => {
    if (servicePlansLoading) {
      dispatch(getAllServicePlans());
    }
  }, [servicePlansLoading]);

  const handleNext = () => {
    // localStorage.setItem('appointmentBookingData', JSON.stringify({...props.appointmentBookingData, showServicePlans: false}))
    props.setAppointmentBookingData((prev) => ({ ...prev, showServicePlans: false }))
  }

  const addServicePlan = (planId: string) => {
    if (props.appointmentBookingData?.service_plans?.includes(planId as never)) return;
    props.setAppointmentBookingData((prev) => {
      return {
        ...prev,
        service_plans: [...(prev.service_plans || []), planId]
      }
    })
  };

  const removeServicePlan = (planId: string) => {
    props.setAppointmentBookingData((prev) => {
      return {
        ...prev,
        service_plans: prev?.service_plans?.filter(id => id !== planId)
      }
    })
  };

  const handleBack = () => {
    props.setAppointmentBookingData((prevData) => ({
      ...prevData,
      vehicle_id: "",
    }));
  };

  const tabsItems = servicePlansDataCategoryWise ? Object.keys(servicePlansDataCategoryWise).map((categoryId, i) => ({
    key: categoryId,
    label: servicePlansDataCategoryWise ? servicePlansDataCategoryWise[categoryId].category.name : '',
    children:
    servicePlansDataCategoryWise[categoryId].plans.length > 0 ? (
      servicePlansDataCategoryWise[categoryId].plans.map((plan, j) => (
          <ServicePlans
            key={j}
            plan={plan}
            addServicePlan={addServicePlan}
            removeServicePlan={removeServicePlan}
            selectedPlans={props.appointmentBookingData.service_plans || []}
          />
        ))
      ) : (
        <div className="text-center text-2xl font-bold mt-4">No Plans available</div>
      ),
  })) : [];

  return (
    <div>
      <Tabs defaultActiveKey="0" tabPosition="top" items={tabsItems} />
      <div className="flex gap-4 items-center">
        <Button onClick={() => handleBack()}>
          Back
        </Button>
        <Button type="primary" onClick={() => handleNext()}>
          Review Details
        </Button>
      </div>
    </div>
  );
};

export default ServicePlanSelection;
