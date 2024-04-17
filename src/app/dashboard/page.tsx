import React from 'react';
import AppointmentCard from './__components/__common/AppointmentCard';
import NotificationCard from './__components/__common/NotificationCard';
import Image from 'next/image';
import AddImage from '../../../public/images/image 2.png';
import PaymentMethods from './__components/__common/PaymentMethods';

type Props = {};

const Page = (props: Props) => {
  return (
    <div className='h-screen overflow-auto py-32 px-4 md:py-0'>
      {/* CARD COMPONENT */}
      <AppointmentCard />
      {/* NOTIFICATION COMPONENT */}

      <NotificationCard />

      <div className="image my-4 w-full">
        <Image src={AddImage} alt='AddImage' className='w-full' />
      </div>

      <PaymentMethods />

    </div>

  );
};

export default Page;
