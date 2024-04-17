"use client";
import Image from 'next/image';
import React from 'react';
import Services from "../../../../../public/images/services.png";

import Calender from "../../../../../public/images/calander.webp";


import { FaHistory } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";

const CustomerMobileFooter = () => {
    return (
        <div className='fixed z-40 left-1/2 translate-x-[-50%] bottom-4 bg-white rounded-2xl p-4 py-1 flex justify-between items-center gap-4 w-11/12 shadow-2xl'>
            <div className="flex flex-col items-center justify-center cursor-pointer">
                <Image src={Services} alt='Services' className='h-[25px] w-[25px]' />
                <p className='mt-1'>Services</p>
            </div>
            <div className="flex flex-col items-center justify-center cursor-pointer">
                <FaHistory className='text-2xl text-black' />
                <p className='mt-1'>History</p>
            </div>
            <div className="flex flex-col items-center justify-center h-[70px] w-[70px] rounded-full bg-gradient-to-r from-[#FFE301] to-[#D7C000] relative top-[-35px] cursor-pointer">
                <Image src={Calender} alt='Calender' className='h-[50px] w-[50px]' />
            </div>
            <div className="flex flex-col items-center justify-center cursor-pointer">
                <FaCreditCard className='text-2xl text-black' />
                <p className='mt-1'>Payments</p>
            </div>
            <div className="flex flex-col items-center justify-center cursor-pointer">
                <MdHeadsetMic className='text-3xl text-black' />
                <p className='mt-0'>Chat</p>
            </div>
        </div>
    );
};

export default CustomerMobileFooter;
