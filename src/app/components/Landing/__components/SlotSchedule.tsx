"use client";
import React, { useState } from "react";
import DatePicker from "./DatePicker";
import ShowSlots from "./ShowSlots";
import { useTranslations } from "next-intl";

interface Props {
  scrollToSlotDetails: () => void;
}

const SlotSchedule: React.FC<Props> = ({ scrollToSlotDetails }) => {
  // State for selected date
  const [selectedDate, setSelectedDate] = useState<string>("");
  const t = useTranslations("SlotSchedule");

  return (
    <div className="relative h-[550px]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
        style={{ backgroundImage: "url('/images/auth-side-img.webp')" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center h-full flex-col gap-14">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-customGray text-center">
          {t("welcome")}
        </h1>

        {/* Date Picker and Slots Display */}
        <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-0 w-full md:w-[606px]">
          <DatePicker
            setSelectedDate={setSelectedDate}
            customClasses="rounded-r-full rounded-l-full sm:rounded-r-[0px] text-3xl text-black p-4 px-12"
          />
          <ShowSlots
            selectedDate={selectedDate}
            scrollToSlotDetails={scrollToSlotDetails}
            customClasses="h-max sm:h-full bg-customGray hover:bg-opacity-90 transition-all duration-200 text-base font-semibold text-red-400 hover:text-red-300  rounded-r-full rounded-l-full sm:rounded-l-[0px] p-4 px-12"
          />
        </div>
      </div>
    </div>
  );
};

export default SlotSchedule;
