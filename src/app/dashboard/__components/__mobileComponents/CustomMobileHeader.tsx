"use client";

import { useAppSelector } from '@/app/store/reduxHooks';
import { IAuthData } from "@/app/store/slices/authSlice";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Fly from "../../../../../public/images/fly.png";
import Bell from "../../../../../public/images/bell.png";
import Profile from "../../../../../public/images/profile.png";
import Dots from "../../../../../public/images/dots.png";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CustomMobileHeader = () => {

    const [user, setUser] = useState<IAuthData>();
    const authData = useAppSelector((state) => state.auth.authData);
    const pathName = usePathname();


    useEffect(() => {
        setUser(authData);
    }, [authData]);

    return (
        <div className='fixed z-50 top-0 left-0 w-full bg-white p-4 flex justify-between items-center'>
            {/* heading */}
            {
                pathName.split("/")[2] === "notifications" ? <div>
                    <h1 className='text-base font-medium'>Active Appointment</h1>
                    <h4 className='text-base font-medium'>Vehicle Advance</h4>
                </div> :
                    <div className="heading relative">
                        <h1 className='text-3xl font-semibold'>Hey</h1>
                        <h1 className='text-3xl font-bold capitalize'>{user?.fullName?.split(" ")[0]}</h1>
                        <Image src={Fly} alt='Fly' className='absolute top-[10px] right-[-24px]' />
                    </div>
            }

            {/* side icons */}

            <div className="flex justify-center items-center gap-2">
                <Link href={"/dashboard/notifications"}><Image src={Bell} alt='Bell' /></Link>
                <Image src={Profile} alt='Profile' />
                <Image src={Dots} alt='Dots' />
            </div>
        </div>
    );
};

export default CustomMobileHeader;
