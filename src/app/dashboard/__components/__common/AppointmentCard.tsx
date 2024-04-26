"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import AppointmentContent from "./AppointmentContent";
import Link from "next/link";

interface AppointmentProps {
  appointmentData: any;
}

const AppointmentCard: React.FC<AppointmentProps> = ({ appointmentData }) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        980: {
          slidesPerView: Object.keys(appointmentData).length > 0 ? 2 : 1,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: Object.keys(appointmentData).length > 0 ? 2 : 1,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: Object.keys(appointmentData).length > 0 ? 2 : 1,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView: Object.keys(appointmentData).length > 0 ? 2 : 1,
          spaceBetween: 20,
        },
      }}
    >
      {Object.keys(appointmentData).length > 0 && (
        <SwiperSlide>
          <AppointmentContent item={appointmentData} />
        </SwiperSlide>
      )}

      <SwiperSlide>
        <div className="bg-gradient-to-r from-[#FFE301] to-[#D7C000] rounded-2xl p-4  min-h-[121px]">
          <h3 className="font-bold text-2xl text-white text-center">
            {Object.keys(appointmentData).length > 0
              ? "Book your appointment"
              : "Dont have any appointment"}
          </h3>
          <div className="flex justify-center items-center mt-4">
            <Link href={"/dashboard/appointment/book"}>
              <button className="bg-black rounded-xl p-2 px-4 text-white hover:shadow-xl">
                Book Appointment
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default AppointmentCard;
