"use client";
import Image from "next/image";
import React, { useState } from "react";
// import Map from "../../../../../public/images/map.webp";
import { useTranslations } from "next-intl";
import { Button, Modal } from "antd";
import SlotDetails from "./SlotDetails";
import SlotSchedule from "./SlotSchedule";
import { IoClose } from "react-icons/io5";

const Operating = () => {
  const t = useTranslations("Operating");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container relative h-[350px] xmd:h-[500px]">
        <Image
          fill
          src={"/images/map.webp"}
          alt="map"
          className="w-full xmd:w-[80%] h-full static"
        />
        <div className="absolute px-4 xmd:px-0 right-0 xmd:right-16 top-1/2 translate-y-[-50%] w-full xmd:w-[37rem]">
          <h2 className="text-customWhite font-normal text-xl sm:text-2xl md:text-3xl xmd:text-[40px] xmd:leading-[46.88px]">
            {t("heading")}
          </h2>
          <h2 className="font-RobotoFlex text-customYellow font-bold text-2xl sm:text-3xl md:text-4xl xmd:text-[61px] xmd:leading-[71.48px]">
            {t("headingTwo")}
          </h2>
          <p className="font-RobotoFlex text-white font-normal texts-base md:text-lg xmd:text-[22px] xmd:leading-[28.78px] mt-4">
            {t("para")}
          </p>
          <button
            className="bg-customYellow text-black font-Inter font-medium sm:font-semibold text-base sm:text-xl  px-10 py-2 mt-8 rounded-full hover:bg-matalicYellow"
            onClick={showModal}
          >
            {t("button")}
          </button>
        </div>
      </div>

      <Modal
        className="w-max custom-model transbox rounded-3xl shadow-2xl"
        styles={{
          content: { backgroundColor: "transparent" }, // turns the Modal red
        }}
        closeIcon={<IoClose size={20} color="white" />}
        centered
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <SlotSchedule />
        <SlotDetails />
      </Modal>
    </>
  );
};

export default Operating;
