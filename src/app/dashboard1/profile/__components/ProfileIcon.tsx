'use client'
import Image from 'next/image'
import React from 'react'

type Props = {}

const ProfileIcon = (props: Props) => {
  return (
    <div className='flex flex-col justify-center items-center w-[100%]'>
        <p>My Profile</p>
        <div className=''>
            <Image
                src={"/images/profile.jpg"}
                alt='Profile'
                height={200}
                width={200}
                className='rounded-full border-2 border-customGray'
            />
        </div>
    </div>
  )
}

export default ProfileIcon