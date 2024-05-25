"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddImage from "../../../../public/images/image-2.webp";
import AppointmentCard from "./__components/__common/AppointmentCard";
import PaymentMethods from "./__components/__common/PaymentMethods";
import Notifications from "./notifications/__components/Notifications";
import { useAppSelector } from "@/app/store/reduxHooks";
import { getCustomerAppointmentInitData } from "@/app/services/operations/appointment/appointment";
import { appointmentNotification } from "@/app/services/operations/notification/appointment";

type Props = {};

const Page = (props: Props) => {
  const [appointmentData, setAppointmentData] = useState({});
  const [notificationData, setNotificationData] = useState({});

  const customerId = useAppSelector((state) => state.auth.authData._id);

  const initData = async () => {
    try {
      if (!customerId) return;
      const initAppointmentData =
        await getCustomerAppointmentInitData(customerId);
      const initNotificationData = await appointmentNotification(
        initAppointmentData._id,
      );
      setAppointmentData(initAppointmentData);
      setNotificationData(initNotificationData);
    } catch (err) {}
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
        <Image src={AddImage} alt="AddImage" className="w-full" />
      </div>
      {/* PAYMENT COMPONENT */}
      <PaymentMethods />
    </div>
  );
};

export default Page;
