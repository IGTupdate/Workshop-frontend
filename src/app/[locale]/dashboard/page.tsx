"use client";
import { getCustomerAppointmentInitData } from "@/app/services/operations/appointment/appointment";
import {
  appointmentNotification,
  initNotification,
} from "@/app/services/operations/notification/appointment";
import { useAppSelector } from "@/app/store/reduxHooks";
import { AppointmentProposalData } from "@/app/types/work-order";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddImage from "../../../../public/images/image-2.webp";
import AppointmentCard from "./__components/__common/AppointmentCard";
import PaymentMethods from "./__components/__common/PaymentMethods";
import Proposal from "./__components/__common/Proposal";
import Notifications from "./notifications/__components/Notifications";

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
      const proposalData = await getCustomerAppointmentInitData(customerId);

      if (proposalData) {
        const { appointmentProposalData, appointmentData } = proposalData;
        setAppointmentProposalData(appointmentProposalData);

        if (Array.isArray(appointmentData) && appointmentData.length > 0) {
          setAppointmentData(appointmentData[0]);

          if (appointmentData[0]._id) {
            const notifications = await initNotification(
              appointmentData[0].customer_id._id,
              appointmentData[0]._id,
              2,
            );
            console.log(notifications, "initNotifications");

            setNotificationData(notifications);
          }
        }
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

      {notificationData && Object.keys(notificationData).length > 0 && (
        <Notifications show={2} notificationData={notificationData} />
      )}

      <div className="image my-4 w-full">
        <Image
          fill
          src={AddImage}
          priority
          alt="AddImage"
          className="w-full relative h-max"
        />
      </div>
      {/* PAYMENT COMPONENT */}

      <Proposal appointmentProposalData={appointmentProposalData} />

      <PaymentMethods />
    </div>
  );
};

export default Page;
