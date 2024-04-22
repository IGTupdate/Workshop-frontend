"use client";
import { getAllCustomerAppointment } from '@/app/services/operations/appointment/appointment';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { useEffect, useState } from 'react';
import { appointmentNotification } from '@/app/services/operations/notification/appointment';
import Loader from '@/app/components/Loader';
import Watermark from '@/app/components/Text/WatermarkText';


interface NotificationItem {
    title: string;
    desc: string;
}

interface NotificationsProps {
    show: any,
    appointmentId?: any; // Define the type for the show prop
}

const Notifications: React.FC<NotificationsProps> = ({ show, appointmentId }) => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { appointmentLoading, appointmentData } = useAppSelector((state) => state.customerAppointment);
    const dispatch = useAppDispatch();


    useEffect(() => {
        // get all appointment
        setLoading(true);

        if (appointmentId) {
            getAllNotifications(appointmentId);
        } else {
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
        <>
            {
                loading ? <div className='flex justify-center items-center h-screen fixed top-0 left-0 bg-white w-screen z-20'> <Loader /></div> :
                    <div className='mt-4'>
                        <div className="heading relative  before:content-[''] before:absolute before:right-0 before:top-1/2 before:translate-y-[-50%] before:w-9/12 before:h-2 before:bg-gradient-to-r before:from-[#FFE301] before:to-[#A79638]">
                            <h2 className='text-xl font-bold'>History</h2>
                        </div>

                        {
                            show === 2 ? <ul className='mt-4 flex flex-col gap-3'>
                                {
                                    notifications?.length > 0 ? notifications.slice(0, 2)?.map((item, index) => (
                                        <li key={index} className='relative ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300'>{item.title}</li>
                                    )) : <p className='py-4 relative'><Watermark text={'No History Available'} /></p>
                                }
                            </ul>
                                : <ul className={`relative ${notifications.length > 3 && 'before:content-[""] before:h-16'} before:absolute before:right-0 before:bottom-0 before:w-full before:bg-gradient-to-t before:from-[#f5f5f5] before:to-transparent`}>
                                    {
                                        notifications?.length > 0 ? notifications.map((item: NotificationItem, index: number) => (
                                            <li key={index} className='ps-10 mt-4'>
                                                <h3 className='font-semibold text-base relative before:content-[""] before:absolute before:left-[-35px] before:top-1/2 before:translate-y-[-50%] before:w-[15px] before:h-[15px] before:rounded-full before:bg-[#FFE301]'>
                                                    {item.title}
                                                </h3>
                                                <p>{item.desc}</p>
                                            </li>
                                        )) : <p className='py-4 relative'><Watermark text={'No History Available'} /></p>
                                    }
                                </ul>
                        }
                    </div>
            }
        </>
    );
};

export default Notifications;
