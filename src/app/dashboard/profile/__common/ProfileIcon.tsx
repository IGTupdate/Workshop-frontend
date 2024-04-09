'use client'
import Image from 'next/image'
import React from 'react'

type Props = {}

const ProfileIcon = (props: Props) => {
  return (
    <div className='flex flex-col justify-center items-center w-[100%]'>
        <Image
            src={"/images/profile.jpg"}
            alt='Profile'
            height={160}
            width={160}
            className='rounded-full border-2 border-customGray'
        />
    </div>
  )
}

export default ProfileIcon