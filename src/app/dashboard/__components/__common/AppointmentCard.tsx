"use client";
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import AppointmentContent from './AppointmentContent';
import { useAppSelector } from '@/app/store/reduxHooks';
import Link from 'next/link';

const AppointmentCard = () => {

    const { appointmentLoading, appointmentData } = useAppSelector((state) => state.customerAppointment);

    const scheduledAppointments = appointmentData.filter(item => item.status === "Scheduled");
    const assignedAppointments = appointmentData.filter(item => item.status === "Assigned");

    const combinedAppointments = assignedAppointments.concat(scheduledAppointments);

    console.log(appointmentData, "appointmentData");

    return (
        <Swiper
            loop={true}
            slidesPerView={combinedAppointments.length > 0 ? 2 : 1}
            spaceBetween={20}
            pagination={{
                clickable: true,
            }}
            className="mySwiper"

            breakpoints={{
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                980: {
                    slidesPerView: combinedAppointments.length > 0 ? 2 : 1,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: combinedAppointments.length > 0 ? 2 : 1,
                    spaceBetween: 20
                },
                1280: {
                    slidesPerView: combinedAppointments.length > 0 ? 2 : 1,
                    spaceBetween: 20
                },
                1400: {
                    slidesPerView: combinedAppointments.length > 0 ? 2 : 1,
                    spaceBetween: 20
                },
                1600: {
                    slidesPerView: combinedAppointments.length > 0 ? 3 : 1,
                    spaceBetween: 20
                },
            }}
        >
            {
                combinedAppointments?.length > 0 && combinedAppointments?.map((item) => (
                    <SwiperSlide key={item._id}>
                        <AppointmentContent item={item} />
                    </SwiperSlide>
                ))
            }

            <SwiperSlide>
                <div className='bg-gradient-to-r from-[#FFE301] to-[#D7C000] rounded-2xl p-4  min-h-[121px]'>
                    <h3 className='font-bold text-2xl text-white text-center'>Don,t have any appointment</h3>
                    <div className="flex justify-center items-center mt-4">
                        <Link href={"/dashboard/appointment/book"}><button className='bg-black rounded-xl p-2 px-4 text-white hover:shadow-xl'>Book Appointment</button></Link>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>

    );
};

export default AppointmentCard;


;
