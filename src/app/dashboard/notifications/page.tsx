"use client";
import React, { useEffect, useState } from "react";
import StepBar from "./__components/StepBar";
import Notifications from "./__components/Notifications";
import { useAppSelector } from "@/app/store/reduxHooks";
import { appointmentNotification } from "@/app/services/operations/notification/appointment";
import { getAppointmentStatus, getCustomerInitData } from "@/app/services/operations/appointment/appointment";
import Loader from "@/app/components/Loader";

const Page = () => {
  const [notificationData, setNotificationData] = useState({});
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const customerId = useAppSelector((state) => state.auth.authData._id);



  useEffect(() => {
    initData();
  }, [customerId]);


  const initData = async () => {
    try {
      if (!customerId) return;
      setLoading(true);
      const initAppointmentData = await getCustomerInitData(customerId);
      if (initAppointmentData?._id) {
        getAllNotificationsData(initAppointmentData?._id);
        getAppointmentStatusData(initAppointmentData?._id);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const getAllNotificationsData = async (id) => {
    const initNotificationData = await appointmentNotification(
      id
    );


    setNotificationData(initNotificationData);
  };

  const getAppointmentStatusData = async (id) => {
    const initAppointmentStatus = await getAppointmentStatus(id);

    setStatus(initAppointmentStatus);
  };

  return (
    <div className="h-screen sm:h-full pt-20 pb-32 px-4 md:py-0 overflow-auto">
      {/* step bar */}
      <StepBar status={status} />

      {/* notifications */}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <Notifications show={"All"} notificationData={notificationData} />
      )}
    </div>
  );
};

export default Page;
