"use client";

import { useAppSelector } from "@/app/store/reduxHooks";
import React, { Suspense } from "react";
import { ChildrenProps } from "../__utils/types";
import CustomerMobileDashboardLayout from "../__mobileComponents/CustomerMobileDashboardLayout";
import CustomerDesktopDashboardLayout from "../__desktopComponents/CustomerDesktopDashboardLayout";
import Loader from "@/app/components/Loader";

const CustomerDashboardLayout = ({ children }: ChildrenProps) => {
  const isSmallDevice = useAppSelector((state) => state.device.isSmallDevice);

  return (
    <>
      {isSmallDevice === -1 ? (
        <div className="flex justify-center items-center min-h-screen w-full">
          <Loader />
        </div>
      ) : isSmallDevice ? (
        <CustomerMobileDashboardLayout>
          {children}
        </CustomerMobileDashboardLayout>
      ) : (
        <CustomerDesktopDashboardLayout>
          {children}
        </CustomerDesktopDashboardLayout>
      )}
      {/* 
            {
                isSmallDevice ? (<CustomerMobileDashboardLayout>{children}</CustomerMobileDashboardLayout>)
                    : (<CustomerDesktopDashboardLayout>{children}</CustomerDesktopDashboardLayout>)
            } */}
    </>
  );
};

export default CustomerDashboardLayout;
