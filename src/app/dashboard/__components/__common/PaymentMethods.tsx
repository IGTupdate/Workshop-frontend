"use client";
import React from 'react';
import AddStarsToNumber from '../__utils/AddStarsToNumber';
import Image from 'next/image';
import MasterCard from '../../../../../public/images/mastercard.png';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


const PaymentMethods = () => {



    return (
        <div>
            <Swiper
                loop={true}
                slidesPerView={'auto'}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="flex flex-col justify-between bg-black rounded-xl p-4 h-28">
                        <p className='text-white'>{AddStarsToNumber(1234567895532458)}</p>
                        <div className="flex justify-between items-center">
                            <p className='text-white'>Enrique H.</p>
                            <Image src={MasterCard} alt='MasterCard' />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col justify-between bg-black rounded-xl p-4 h-28">
                        <p className='text-white'>{AddStarsToNumber(1234567895532458)}</p>
                        <div className="flex justify-between items-center">
                            <p className='text-white'>Enrique H.</p>
                            <Image src={MasterCard} alt='MasterCard' />
                        </div>
                    </div>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default PaymentMethods;




