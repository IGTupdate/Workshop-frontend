"use client";
import React, { useEffect, useState } from 'react';
import StepBar from './__components/StepBar';
import Notifications from './__components/Notifications';
import { useAppSelector } from '@/app/store/reduxHooks';
import { appointmentNotification } from '@/app/services/operations/notification/appointment';
import { getCustomerInitData } from '@/app/services/operations/appointment/appointment';


const Page = () => {

    const [notificationData, setNotificationData] = useState({});

    const customerId = useAppSelector((state) => state.auth.authData._id);

    const initData = async () => {
        try {
            if (!customerId) return;
            const initAppointmentData = await getCustomerInitData(customerId);
            const initNotificationData = await appointmentNotification(initAppointmentData._id);
            setNotificationData(initNotificationData);
        } catch (err) {
        }
    };

    useEffect(() => {
        initData();
    }, [customerId]);


    return (
        <div className='h-screen pt-20 pb-32 px-4 md:py-0 overflow-auto'>
            {/* step bar */}
            <StepBar />

            {/* notifications */}
            <Notifications show={"All"} notificationData={notificationData} />
        </div>
    );
};

export default Page;
