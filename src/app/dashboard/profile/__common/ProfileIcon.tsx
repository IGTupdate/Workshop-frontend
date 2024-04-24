'use client';
import Image from 'next/image';
import React from 'react';
import { LiaEdit } from "react-icons/lia";
import { TiArrowBackOutline } from "react-icons/ti";



const ProfileIcon: React.FC<Props> = ({ edit, setEdit }) => {

  return (
    <div>
      <div className='absolute left-[20px] top-[-50px]'>
        <Image
          src={"/images/profile.jpg"}
          alt='Profile'
          height={100}
          width={100}
          className='rounded-full'
        />
      </div>
      <div className="flex justify-end items-center w-full">
        {
          edit ? <TiArrowBackOutline className='text-xl font-bold cursor-pointer' onClick={() => setEdit(false)} />
            : <LiaEdit className='text-xl font-bold cursor-pointer' onClick={() => setEdit(true)} />

        }
      </div>
    </div>
  );
};

export default ProfileIcon;