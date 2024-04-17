'use client';
import ProfileForm from './__common/ProfileForm';
import ProfileIcon from './__common/ProfileIcon';
import Image from 'next/image';
import BgCar from "../../../../public/images/bgcar.png";

type Props = {};

const page = (props: Props) => {
  return (
    <div className=' flex flex-col gap-4 pb-4 relative'>
      <div className='h-80 w-full'><Image src={BgCar} alt='bgcar' className='h-full w-full bg-cover bg-center' /></div>
      <div className='p-6 bg-white absolute bottom-[-248px] left-1/2 translate-x-[-50%]'>
        <h1 className=' customer-page-title'>My Profile</h1>
        <ProfileIcon />
        <ProfileForm />
      </div>
    </div>
  );
};

export default page;