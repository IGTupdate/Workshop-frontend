'use client'
import React from 'react';
import CustomerDashboardLayout from './__components/__common/CustomerDashboardLayout';
import useDeviceType from './__hooks/useDeviceType';
import { ChildrenProps } from './__components/__utils/types';

const RootLayout: React.FC<ChildrenProps> = ({ children }) => {
  useDeviceType();

  return (
    <div>
      <CustomerDashboardLayout>{children}</CustomerDashboardLayout>
    </div>
  );
};

export default RootLayout;
