"use client";
import React, { useEffect, useState } from "react";
import StepBar from "./__components/StepBar";
import Notifications from "./__components/Notifications";
import { useAppSelector } from "@/app/store/reduxHooks";
import {
  appointmentNotification,
  initNotification,
} from "@/app/services/operations/notification/appointment";
import {
  getAppointmentStatus,
  getCustomerAppointmentInitData,
} from "@/app/services/operations/appointment/appointment";
import Loader from "@/app/components/Loader";
// import { getCustomerAuthInitData } from "@/app/services/operations/auth/common";
// import { TAppointmentWorkOrderStatus } from "@/app/types/appointment";

interface NotificationData {
  // Define the structure of your notification data here
}

// interface AppointmentStatus {
//   // Define the structure of your appointment status here
// }

const Page: React.FC = () => {
  const [notificationData, setNotificationData] =
    useState<NotificationData | null>(null);
  // const [status, setStatus] = useState<TAppointmentWorkOrderStatus | null>(
  //   null,
  // );
  const [loading, setLoading] = useState<boolean>(false);

  const customerId = useAppSelector((state) => state.auth.authData?._id);

  useEffect(() => {
    initData();
  }, [customerId]);

  const initData = async () => {
    try {
      if (!customerId) return;
      setLoading(true);
      const initAppointmentData =
        await getCustomerAppointmentInitData(customerId);

      // console.log(initAppointmentData, "initAppointmentData");

      if (initAppointmentData?.appointmentData[0]?._id) {
        await getAllNotificationsData(
          customerId,
          initAppointmentData?.appointmentData[0]?._id,
        );
        // await getAppointmentStatusData(
        //   initAppointmentData?.appointmentData[0]?._id,
        // );
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const getAllNotificationsData = async (
    customerId: string,
    appointmentId: string,
  ) => {
    const initNotificationData = await initNotification(
      customerId,
      appointmentId,
    );
    setNotificationData(initNotificationData);
  };

  // const getAppointmentStatusData = async (id: string) => {
  //   const initAppointmentStatus = await getAppointmentStatus(id);
  //   setStatus(initAppointmentStatus);
  // };

  return (
    <div className="h-screen md:h-full pt-24 pb-32 px-4 md:py-0 overflow-auto">
      {/* step bar */}
      {loading ? (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : (
        <>
          {/* {status !== null && Object.keys(status).length > 0 && (
            <StepBar status={status} />
          )} */}

          {/* notifications */}

          <Notifications show={"All"} notificationData={notificationData} />
        </>
      )}
    </div>
  );
};

export default Page;
