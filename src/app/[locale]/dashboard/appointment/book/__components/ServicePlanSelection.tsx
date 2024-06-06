"use client";
import { getAllServicePlans } from "@/app/services/operations/appointment/service-plans";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { TAppointmentBook } from "@/app/types/appointment";
import { Button, Tabs } from "antd";
import { useEffect, useState } from "react";
import ServicePlans from "./ServicePlans";
import { getAllServicePlansCategoryWise } from "../../__utils/GetServicePlansSegregatedData";
import { TSegregatedServiceData, TServicePlans } from "@/app/types/service";
import { getAppointMentBookInitData } from "@/app/services/operations/appointment/appointment";
import { TVehicle } from "@/app/types/vehicle";
import { TSlot } from "@/app/types/calender";
import Loader from "@/app/components/Loader";
import Watermark from "@/app/components/Text/WatermarkText";
import { useTranslations } from "next-intl";

type Props = {
  appointmentBookingData: TAppointmentBook;
  setAppointmentBookingData: React.Dispatch<
    React.SetStateAction<TAppointmentBook>
  >;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const ServicePlanSelection: React.FC<Props> = (props) => {
  const [loader, setLoader] = useState(false);
  const { servicePlansLoading, servicePlansData } = useAppSelector(
    (state) => state.servicePlan,
  );
  const t = useTranslations("ServicePlanSelection");
  const dispatch = useAppDispatch();
  const [servicePlansDataCategoryWise, setServicePlansDataCategoryWise] =
    useState<TSegregatedServiceData | null>(null);

  useEffect(() => {
    (async function () {
      setLoader(true);
      try {
        const result = await getAllServicePlansCategoryWise(servicePlansData);

        setServicePlansDataCategoryWise(result);
        setLoader(false);
      } catch (error) {
        setLoader(false);
      }
    })();
  }, [servicePlansData]);

  useEffect(() => {
    if (localStorage.getItem("selectedPlans"))
      localStorage.removeItem("selectedPlans");
  }, []);

  useEffect(() => {
    if (servicePlansLoading) {
      dispatch(getAllServicePlans(props.appointmentBookingData.vehicle_id));
    }
  }, [servicePlansLoading]);

  const handleNext = () => {
    // localStorage.setItem('appointmentBookingData', JSON.stringify({...props.appointmentBookingData, showServicePlans: false}))
    props.setAppointmentBookingData((prev) => ({
      ...prev,
      showServicePlans: false,
    }));
  };

  const addServicePlan = (planId: string) => {
    if (props.appointmentBookingData?.service_plans?.includes(planId as never))
      return;
    props.setAppointmentBookingData((prev) => {
      return {
        ...prev,
        service_plans: [...(prev.service_plans || []), planId],
      };
    });
  };

  const removeServicePlan = (planId: string) => {
    props.setAppointmentBookingData((prev) => {
      return {
        ...prev,
        service_plans: prev?.service_plans?.filter((id) => id !== planId),
      };
    });
  };

  const handleBack = () => {
    props.setAppointmentBookingData((prevData) => ({
      ...prevData,
      vehicle_id: "",
    }));
  };

  type TappointmentBookingConfirmationData = {
    vehicle: null | TVehicle;
    customer: null | {
      contactNumber: string;
      fullName: string;
      email: string;
    };
    servicePlans: TServicePlans[] | [];
    service_description: string[] | [];
    slot_details: TSlot | null;
  };

  const [
    appointmentBookingConfirmationData,
    setAppointmentBookingConfirmationData,
  ] = useState<TappointmentBookingConfirmationData>({
    vehicle: null,
    customer: null,
    servicePlans: [],
    service_description: [],
    slot_details: null,
  });

  useEffect(() => {
    if (servicePlansLoading) {
      dispatch(getAllServicePlans(props.appointmentBookingData.vehicle_id));
    }
    // console.log(servicePlansData);
    let plans: TServicePlans[] = [];
    plans = servicePlansData?.filter((plan) =>
      props.appointmentBookingData?.service_plans?.includes(plan._id as never),
    );
    // console.log(plans)

    setAppointmentBookingConfirmationData((prev) => ({
      ...prev,
      servicePlans: plans,
    }));
  }, [
    servicePlansLoading,
    servicePlansData,
    props.appointmentBookingData?.service_plans,
  ]);

  const tabsItems = servicePlansDataCategoryWise
    ? Object.keys(servicePlansDataCategoryWise).map((categoryId, i) => ({
        key: categoryId,
        label: servicePlansDataCategoryWise
          ? servicePlansDataCategoryWise[categoryId].category.name
          : "",
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
            <div className="relative h-20">
              <Watermark text={t("watermark")} />
            </div>
          ),
      }))
    : [];

  return (
    <>
      {loader ? (
        <div
          style={{ height: "calc(100vh - 400px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : (
        <div>
          {appointmentBookingConfirmationData?.servicePlans?.length > 0 && (
            <div className="my-8">
              <h2 className="font-bold text-xl">{t("selectedPlans")}</h2>

              <div className="flex flex-wrap items-center gap-4">
                {appointmentBookingConfirmationData?.servicePlans?.map(
                  (plan, index) => (
                    <h3 key={index} className="font-medium text-nowrap">
                      {plan.name}
                    </h3>
                  ),
                )}
              </div>
            </div>
          )}

          <Tabs defaultActiveKey="0" tabPosition="top" items={tabsItems} />
          <div className="flex gap-4 items-center">
            <Button onClick={() => handleBack()}>{t("backButton")}</Button>
            <Button type="primary" onClick={() => handleNext()}>
              {t("reviewButton")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicePlanSelection;
