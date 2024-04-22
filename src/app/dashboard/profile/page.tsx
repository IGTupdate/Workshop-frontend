'use client';
import ProfileForm from './__common/ProfileForm';
import ProfileIcon from './__common/ProfileIcon';
import { useState } from 'react';

type Props = {};

const page = (props: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <div className='h-screen md:h-[85vh] p-4 sm:p-0 flex flex-col justify-center items-center gap-4 relative'>
      {/* <div className='h-80 w-full'><Image src={BgCar} alt='bgcar' className='h-full w-full bg-cover bg-center' /></div> */}
      <div className='p-6 bg-white relative shadow-2xl rounded-xl w-full sm:w-[400px] h-[23rem]'>
        {/* <h1 className=' customer-page-title'>My Profile</h1> */}
        <ProfileIcon edit={edit} setEdit={setEdit} />
        <ProfileForm edit={edit} setEdit={setEdit} />
      </div>
    </div>
  );
};

export default page;