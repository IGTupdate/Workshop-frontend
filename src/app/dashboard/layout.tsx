"use client";
import React from "react";
import CustomerDashboardLayout from "./__components/__common/CustomerDashboardLayout";
import useDeviceType from "./__hooks/useDeviceType";
import { ChildrenProps } from "./__components/__utils/types";
import { useAppSelector } from "../store/reduxHooks";
import Loader from "../components/Loader";

const RootLayout: React.FC<ChildrenProps> = ({ children }) => {
  useDeviceType();
  const authLoading = useAppSelector((state) => state.auth.authLoading);

  return (
    <>
      {authLoading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <Loader />
        </div>
      ) : (
        <div>
          <CustomerDashboardLayout>{children}</CustomerDashboardLayout>
        </div>
      )}
    </>
  );
};

export default RootLayout;
