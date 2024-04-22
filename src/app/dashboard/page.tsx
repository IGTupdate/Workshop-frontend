'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AddImage from '../../../public/images/image-2.webp';
import { getCustomerInitData } from '../services/operations/appointment/appointment';
import { useAppSelector } from '../store/reduxHooks';
import AppointmentCard from './__components/__common/AppointmentCard';
import PaymentMethods from './__components/__common/PaymentMethods';
import Notifications from './notifications/__components/Notifications';
import { appointmentNotification } from '../services/operations/notification/appointment';

type Props = {};

const Page = (props: Props) => {

  const [appointmentData, setAppointmentData] = useState({})
  const [notificationData, setNotificationData] = useState({})

  const customerId = useAppSelector((state) => state.auth.authData._id)

  const initData = async () => {
    try{
      if(!customerId) return
      const initAppointmentData = await getCustomerInitData(customerId)
      const initNotificationData = await appointmentNotification(initAppointmentData._id);
      setAppointmentData(initAppointmentData)
      setNotificationData(initNotificationData)
    }catch(err){
    }
  }

  useEffect(() => {
    initData()
  },[])

  console.log(appointmentData,notificationData)
  return (
    <div className='h-screen overflow-auto py-32 px-4 md:py-0'>
      {/* CARD COMPONENT */}
      <AppointmentCard />
      {/* NOTIFICATION COMPONENT */}

      <Notifications show={2} />

      <div className="image my-4 w-full">
        <Image src={AddImage} alt='AddImage' className='w-full' />
      </div>
      {/* PAYMENT COMPONENT */}
      <PaymentMethods />

    </div>

  );
};

export default Page;
