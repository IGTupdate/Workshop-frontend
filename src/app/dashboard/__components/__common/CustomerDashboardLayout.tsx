import { useAppSelector } from '@/app/store/reduxHooks';
import React from 'react';
import { ChildrenProps } from '../__utils/types';
import CustomerMobileDashboardLayout from '../__mobileComponents/CustomerMobileDashboardLayout';
import CustomerDesktopDashboardLayout from '../__desktopComponents/CustomerDesktopDashboardLayout';

const CustomerDashboardLayout = ({ children }: ChildrenProps) => {
    const isSmallDevice = useAppSelector((state) => state.device.isSmallDevice)
    return (
        <>
            {
                isSmallDevice ? (<CustomerMobileDashboardLayout>{children}</CustomerMobileDashboardLayout>)
                    : (<CustomerDesktopDashboardLayout>{children}</CustomerDesktopDashboardLayout>)
            }
        </>
    )
}

export default CustomerDashboardLayout