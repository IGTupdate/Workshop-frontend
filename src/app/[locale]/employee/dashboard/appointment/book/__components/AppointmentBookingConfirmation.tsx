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
import { TVehicle } from "@/app/types/vehicle";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { removeQueryParams, setQueryParams } from "@/app/utils/helper";
import { Button, Divider, Typography } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { FiEdit } from "react-icons/fi";

const { Title } = Typography;

type Props = {
  appointmentBookingData: TAppointmentBook;
  setAppointmentBookingData: React.Dispatch<
    React.SetStateAction<TAppointmentBook>
  >;
};

type TappointmentBookingConfirmationData = {
  vehicle: null | TVehicle;
  customer: null | {
    contactNumber: string;
    fullName: string;
    email: string;
  };
  slot_details: TSlot | null;
};

const AppointmentBookingConfirmation = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userRole = useAppSelector((state) => state.auth.authData.role);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [
    appointmentBookingConfirmationData,
    setAppointmentBookingConfirmationData,
  ] = useState<TappointmentBookingConfirmationData>({
    vehicle: null,
    customer: null,
    slot_details: null,
  });

  useEffect(() => {
    setLoading(true);
    // console.log(props.appointmentBookingData);

    if (
      props.appointmentBookingData.calender_id &&
      props.appointmentBookingData.slot_id &&
      props.appointmentBookingData.customer_id &&
      props.appointmentBookingData.vehicle_id
    ) {
      (async function () {
        try {
          const responseData = (await getAppointMentBookInitData(
            props.appointmentBookingData,
          )) as TappointmentBookingConfirmationData;
          // console.log(responseData);
          // console.log(responseData);
          setAppointmentBookingConfirmationData(responseData);
          setLoading(false);
        } catch (err) {
          // console.log(err);
        }
      })();
    }
  }, [props.appointmentBookingData]);

  const handleBack = () => {
    props.setAppointmentBookingData((prv) => {
      return {
        ...prv,
        vehicle_id: "",
      };
    });
  };

  const handleBookAppointment = async () => {
    try {
      setLoading(true);
      const response = await bookAppointment(props.appointmentBookingData);
      // console.log(response);
      toast.success(response?.message);
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

  return loading ? (
    <div className="flex justify-center items-center h-full">
      <Loader />
    </div>
  ) : (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <div>
        <div className="grid grid-cols-2">
          <Title level={5}>Customer Details</Title>
          {userRole === "customer" && (
            <div className="flex justify-end">
              <Button
                type="link"
                onClick={() => {
                  changeAppointmentBookingData("customer_id", "");
                }}
              >
                <FiEdit />
              </Button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <DescriptionItem
            title="Name"
            content={
              appointmentBookingConfirmationData?.customer?.fullName || "-"
            }
          />
          <DescriptionItem
            title="Phone"
            content={
              appointmentBookingConfirmationData?.customer?.contactNumber || "-"
            }
          />
          <DescriptionItem
            title="Email"
            content={appointmentBookingConfirmationData?.customer?.email || "-"}
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
              <FiEdit />
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
          <Title level={5}>Slot Details</Title>
          <div className="flex justify-end">
            <Button type="link" onClick={changeSlotDetails}>
              <FiEdit />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <DescriptionItem
            title="Start"
            content={
              appointmentBookingConfirmationData.slot_details?.start_time
                ? new Date(
                    appointmentBookingConfirmationData.slot_details?.start_time,
                  ).toLocaleString()
                : "-"
            }
          />
          <DescriptionItem
            title="End"
            content={
              appointmentBookingConfirmationData.slot_details?.end_time
                ? new Date(
                    appointmentBookingConfirmationData.slot_details?.end_time,
                  ).toLocaleString()
                : "-"
            }
          />
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Button onClick={handleBack}>Back </Button>
        <Button
          type="primary"
          onClick={handleBookAppointment}
          className="border-none hover:shadow-lg text-white"
        >
          Book
        </Button>
      </div>
    </div>
  );
};

export default AppointmentBookingConfirmation;
