"use client";
import { getAllServicePlans } from "@/app/services/operations/appointment/service-plans";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { TAppointmentBook } from "@/app/types/appointment";
import { Button, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useEffect, useState } from "react";
import ServicePlans from "./ServicePlans";
import Watermark from "@/app/components/Text/WatermarkText";

type Props = {
  setAppointmentBookingData: React.Dispatch<
    React.SetStateAction<TAppointmentBook>
  >;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const ServicePlanSelection: React.FC<Props> = (props) => {
  const { servicePlansLoading, servicePlansData } = useAppSelector(
    (state) => state.servicePlan
  );

  const [activeTab, setActiveTab] = useState<string>("");

  const dispatch = useAppDispatch();
  const [selectedPlans, setSelectedPlans] = useState<string[]>(
    JSON.parse(localStorage.getItem("selectedPlans") || "")
  );

  useEffect(() => {
    if (servicePlansLoading) {
      dispatch(getAllServicePlans());
    }
  }, [servicePlansLoading]);

  useEffect(() => {
    if (Object.keys(servicePlansData).length > 0) {
      setActiveTab(Object.keys(servicePlansData)[0]);
    }
  }, [servicePlansData]);

  useEffect(() => {
    props.setAppointmentBookingData((prevData) => ({
      ...prevData,
      service_plans: selectedPlans ? selectedPlans : [],
    }));
  }, [selectedPlans]);

  const addServicePlan = (planId: string) => {
    if (selectedPlans.includes(planId)) return;
    const updatedPlans = [...selectedPlans, planId];
    setSelectedPlans(updatedPlans);
    localStorage.setItem("selectedPlans", JSON.stringify(updatedPlans));
  };

  const removeServicePlan = (planId: string) => {
    const updatedPlans = selectedPlans.filter((id) => id !== planId);
    setSelectedPlans(updatedPlans);
    localStorage.setItem("selectedPlans", JSON.stringify(updatedPlans));
  };

  const handleBack = () => {
    props.setAppointmentBookingData((prevData) => ({
      ...prevData,
      vehicle_id: "",
    }));
  };

  const handleNext = () => {
    props.setCurrentStep(3);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="0"
        tabPosition="top"
        onTabClick={(event) => setActiveTab(event)}
      >
        {Object.keys(servicePlansData).map((categoryId) => (
          <TabPane
            tab={servicePlansData[categoryId].category.name}
            key={categoryId}
          >
            {servicePlansData[categoryId].plans.length > 0 ? (
              servicePlansData[categoryId].plans.map((plan) => (
                <ServicePlans
                  key={plan._id}
                  plan={plan}
                  addServicePlan={addServicePlan}
                  removeServicePlan={removeServicePlan}
                />
              ))
            ) : (
              <div className="text-center text-2xl font-bold mt-4">
                <Watermark text="No Plans available" />
              </div>
            )}
          </TabPane>
        ))}
      </Tabs>
      {servicePlansData[activeTab]?.plans?.length > 0 && (
        <div className="flex gap-4 items-center">
          <Button onClick={() => handleBack()}>Back</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Review Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServicePlanSelection;
