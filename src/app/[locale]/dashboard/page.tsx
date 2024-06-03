"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddImage from "../../../../public/images/image-2.webp";
import AppointmentCard from "./__components/__common/AppointmentCard";
import PaymentMethods from "./__components/__common/PaymentMethods";
import Notifications from "./notifications/__components/Notifications";
import { useAppSelector } from "@/app/store/reduxHooks";
import {
  getCustomerAppointmentInitData,
  getCustomerAppointmentInitProposalData,
} from "@/app/services/operations/appointment/appointment";
import { appointmentNotification } from "@/app/services/operations/notification/appointment";
import Proposal from "./__components/__common/Proposal";
import { AppointmentProposalData } from "@/app/types/work-order";

type Props = {};

const Page = (props: Props) => {
  const [appointmentData, setAppointmentData] = useState({});
  const [notificationData, setNotificationData] = useState({});
  const [appointmentProposalData, setAppointmentProposalData] =
    useState<AppointmentProposalData | null>(null);

  const customerId = useAppSelector((state) => state.auth.authData._id);

  const initData = async () => {
    if (!customerId) return;

    try {
      const [proposalData, initAppointmentData] = await Promise.all([
        getCustomerAppointmentInitProposalData(customerId),
        getCustomerAppointmentInitData(customerId),
      ]);

      setAppointmentProposalData(proposalData);
      setAppointmentData(initAppointmentData);

      console.log(initAppointmentData, "initAppointmentData");

      if (initAppointmentData?._id) {
        const initNotificationData = await appointmentNotification(
          initAppointmentData?._id,
        );

        // Update state after all data has been successfully fetched
        setNotificationData(initNotificationData);
      }
    } catch (err) {
      console.error("Failed to initialize data:", err);
    }
  };

  useEffect(() => {
    initData();
  }, [customerId]);

  return (
    <div className="h-max overflow-auto py-32 px-4 md:py-0">
      {/* CARD COMPONENT */}
      <AppointmentCard appointmentData={appointmentData} />
      {/* NOTIFICATION COMPONENT */}

      <Notifications show={2} notificationData={notificationData} />

      <div className="image my-4 w-full">
        <Image fill src={AddImage} alt="AddImage" className="w-full" />
      </div>
      {/* PAYMENT COMPONENT */}

      <Proposal appointmentProposalData={appointmentProposalData} />

      <PaymentMethods />
    </div>
  );
};

export default Page;
