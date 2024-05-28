"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import AppointmentContent from "./AppointmentContent";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface AppointmentProps {
  appointmentData: any;
}

const AppointmentCard: React.FC<AppointmentProps> = ({ appointmentData }) => {
  const t = useTranslations("AppointmentCard");

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
          slidesPerView:
            appointmentData != undefined &&
            appointmentData != null &&
            Object.keys(appointmentData)?.length > 0
              ? 2
              : 1,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView:
            appointmentData != undefined &&
            appointmentData != null &&
            Object.keys(appointmentData)?.length > 0
              ? 2
              : 1,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView:
            appointmentData != undefined &&
            appointmentData != null &&
            Object.keys(appointmentData)?.length > 0
              ? 2
              : 1,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView:
            appointmentData != undefined &&
            appointmentData != null &&
            Object.keys(appointmentData)?.length > 0
              ? 2
              : 1,
          spaceBetween: 20,
        },
      }}
    >
      {appointmentData != undefined &&
        appointmentData != null &&
        Object.keys(appointmentData)?.length > 0 && (
          <SwiperSlide>
            <AppointmentContent item={appointmentData} />
          </SwiperSlide>
        )}

      <SwiperSlide>
        <div className="bg-gradient-to-r from-[#FFE301] to-[#D7C000] rounded-2xl p-4  min-h-[121px] shadow-3d">
          <h3 className="font-bold text-2xl text-white text-center">
            {appointmentData != undefined &&
            appointmentData != null &&
            Object?.keys(appointmentData)?.length > 0
              ? t("book")
              : t("dont")}
          </h3>
          <div className="flex justify-center items-center mt-4">
            <Link href={"/dashboard/appointment/book"}>
              <button className="bg-slate-950 uppercase relative border border-transparent text-base border-3 hover:border-slate-900 rounded-lg m-0 hover:bg-transparent hover:shadow-xl py-1 px-4 text-white">
                {t("button")}
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default AppointmentCard;
