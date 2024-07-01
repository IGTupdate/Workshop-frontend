"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { TbMailFilled } from "react-icons/tb";

const Footer = () => {
  const t = useTranslations("BrochureFooter");
  return (
    <div className="container px-12 pt-16 pb-8">
      <h2 className="text-white font-bold font-RobotoFlex text-2xl sm:text-4xl md:text-6xl lg:leading-[72px] 2xl:text-[80px] 2xl:leading-[93.75px]">
        {t("heading")}
      </h2>

      <div className="flex justify-start xmd:justify-end items-center mt-8">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-3 text-white text-xl sm:text-2xl md:text-3xl xmd:text-[40px]">
            <FaPhoneAlt /> <span>33 1012 1666</span>
          </li>
          <li className="flex items-center gap-3 text-white text-xl sm:text-2xl md:text-3xl xmd:text-[40px]">
            <TbWorld /> <span>http://appviser.com.mx/</span>
          </li>
          <li className="flex items-center gap-3 text-white text-xl sm:text-2xl md:text-3xl xmd:text-[40px]">
            <TbMailFilled /> <span>contacto@appviser.com.mx</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
