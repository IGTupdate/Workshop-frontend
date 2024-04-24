"use client";
import DescriptionItem from "@/app/components/DescriptionItem.tsx";
import Loader from "@/app/components/Loader";
import {
  bookAppointment,
  getAppointMentBookInitData,
} from "@/app/services/operations/appointment/appointment";
import { useAppSelector } from "@/app/store/reduxHooks";
import { TAppointmentBook } from "@/app/types/appointment";
import { TSlot } from "@/app/types/calender";
import { TServicePlans } from "@/app/types/service";
import { TVehicle } from "@/app/types/vehicle";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { removeQueryParams } from "@/app/utils/helper";
import { Button, Divider, Typography } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ServicePlans from "./ServicePlans";

const { Title } = Typography;

type Props = {
  appointmentBookingData: TAppointmentBook;
  setAppointmentBookingData: React.Dispatch<
    React.SetStateAction<TAppointmentBook>
  >;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

type TappointmentBookingConfirmationData = {
  vehicle: null | TVehicle;
  customer: null | {
    phone: string;
    name: string;
    email: string;
  };
  servicePlans: TServicePlans[] | [];
  service_description: string[] | [];
  slot_details: TSlot | null;
};

const AppointmentBookingConfirmation = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userRole = useAppSelector((state) => state.auth.authData.role);
  const servicePlans = useAppSelector(
    (state) => state.servicePlan.servicePlansData
  );

  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    setLoading(true);

    if (
      props.appointmentBookingData.calender_id &&
      props.appointmentBookingData.slot_id &&
      props.appointmentBookingData.customer_id &&
      props.appointmentBookingData.vehicle_id
    ) {
      (async function () {
        try {
          const responseData = await getAppointMentBookInitData(
            props.appointmentBookingData
          );

          let plans: TServicePlans[] = [];
          plans = Object.values(servicePlans)
            .flatMap((category) => category.plans)
            .filter((plan) =>
              props.appointmentBookingData.service_plans?.includes(plan._id)
            );

          setAppointmentBookingConfirmationData({
            ...responseData,
            servicePlans: plans,
          });
          setLoading(false);
        } catch (err) {
          // console.log(err);
        }
      })();
    }
  }, [props.appointmentBookingData]);

  const handleBack = () => {
    props.setCurrentStep(2);
  };

  const handleBookAppointment = async () => {
    try {
      setLoading(true);
      const response = await bookAppointment(props.appointmentBookingData);
      toast.success(response?.message);
      localStorage.removeItem("selectedPlans");
      userRole === "customer"
        ? router.push(`/dashboard/appointment/${response.data._id}`)
        : router.push(`/employee/dashboard/appointment/${response.data._id}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const changeSlotDetails = () => {
    let queryParams = removeQueryParams(searchParams.toString(), "slot_id");
    queryParams = removeQueryParams(queryParams, "calender_id");

    router.push(`${pathname}?${queryParams}`);
  };

  const changeAppointmentBookingData = (name: string, value: string) => {
    props.setAppointmentBookingData((prv) => {
      return {
        ...prv,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    console.log(appointmentBookingConfirmationData);
  }, [appointmentBookingConfirmationData]);

  return loading ? (
    <div className="flex justify-center items-center h-full">
      <Loader />
    </div>
  ) : (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <div>
        <div className="grid grid-cols-2">
          <Title level={5}>Customer Details</Title>
          <div className="flex justify-end">
            <Button
              type="link"
              onClick={() => {
                changeAppointmentBookingData("customer_id", "");
              }}
            >
              Change
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <DescriptionItem
            title="Name"
            content={appointmentBookingConfirmationData.customer?.name || "-"}
          />
          <DescriptionItem
            title="Phone"
            content={appointmentBookingConfirmationData.customer?.phone || "-"}
          />
          <DescriptionItem
            title="Email"
            content={appointmentBookingConfirmationData.customer?.email || "-"}
          />
        </div>
      </div>
      <Divider />
      <div>
        <div className="grid grid-cols-2">
          <Title level={5}>Vehicle Details</Title>
          <div className="flex justify-end">
            <Button
              type="link"
              onClick={() => {
                changeAppointmentBookingData("vehicle_id", "");
              }}
            >
              Change
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <DescriptionItem
            title="Registeration Number"
            content={
              appointmentBookingConfirmationData.vehicle
                ?.registeration_number || "-"
            }
          />
          <DescriptionItem
            title="Vin"
            content={appointmentBookingConfirmationData.vehicle?.vin || "-"}
          />
          <DescriptionItem
            title="Make"
            content={
              appointmentBookingConfirmationData.vehicle?.vehicle_make || "-"
            }
          />
          <DescriptionItem
            title="Model"
            content={
              appointmentBookingConfirmationData.vehicle?.vehicle_model || "-"
            }
          />
          <DescriptionItem
            title="Owner"
            content={appointmentBookingConfirmationData.vehicle?.owner || "-"}
          />
        </div>
      </div>
      <Divider />
      <div>
        <div className="grid grid-cols-2">
          <Title level={5}>Service Plan Details</Title>
          <div className="flex justify-end">
            <Button
              type="link"
              onClick={() => {
                props.setCurrentStep(2);
              }}
            >
              Change
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {appointmentBookingConfirmationData.servicePlans.map((plan) => (
            <ServicePlans key={plan._id} plan={plan} />
          ))}
        </div>
      </div>
      <Divider />
      <div>
        <div className="grid grid-cols-2">
          <Title level={5}>Slot Details</Title>
          <div className="flex justify-end">
            <Button type="link" onClick={changeSlotDetails}>
              Change
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <DescriptionItem
            title="Start"
            content={
              appointmentBookingConfirmationData.slot_details?.start_time
                ? new Date(
                    appointmentBookingConfirmationData.slot_details?.start_time
                  ).toLocaleString()
                : "-"
            }
          />
          <DescriptionItem
            title="End"
            content={
              appointmentBookingConfirmationData.slot_details?.end_time
                ? new Date(
                    appointmentBookingConfirmationData.slot_details?.end_time
                  ).toLocaleString()
                : "-"
            }
          />
        </div>
      </div>
      <Divider />
      <div>
        <div className="grid grid-cols-2">
          <Title level={5}>Remarks</Title>
          Add Description
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Button onClick={() => handleBack()}>Back </Button>
        <Button
          onClick={() => handleBookAppointment()}
          className="bg-black border-none hover:shadow-lg text-white"
        >
          Book
        </Button>
      </div>
    </div>
  );
};

export default AppointmentBookingConfirmation;
