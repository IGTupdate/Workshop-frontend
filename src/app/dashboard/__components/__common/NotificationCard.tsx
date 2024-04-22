"use client";
import { getAllCustomerAppointment } from '@/app/services/operations/appointment/appointment';
import { appointmentNotification } from '@/app/services/operations/notification/appointment';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import React, { useEffect, useState } from 'react';

interface NotificationItem {
    title: string;
    desc: string;
}

const NotificationCard = () => {

    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { appointmentLoading, appointmentData } = useAppSelector((state) => state.customerAppointment);
    const dispatch = useAppDispatch();


    useEffect(() => {
        // get all appointment
        setLoading(true);
        if (appointmentLoading) {
            dispatch(getAllCustomerAppointment());
        }

        // store new appointment id in state
        if (appointmentData?.length > 0) {
            const id = appointmentData[appointmentData.length - 1]?._id;


            if (id) {
                getAllNotifications(id);

            }

        }
    }, [appointmentLoading, dispatch]);

    const getAllNotifications = async (id: string) => {
        const result = await appointmentNotification(id);
        if (result) {
            setNotifications([...result].reverse());
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    return (
        <div className='mt-6'>
            <h3 className='font-lg font-bold'>Notifications</h3>

            <ul className='mt-4 flex flex-col gap-3'>
                {
                    notifications.slice(0, 2)?.map((item, index) => (
                        <li key={index} className='relative ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300'>{item.title}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default NotificationCard;
