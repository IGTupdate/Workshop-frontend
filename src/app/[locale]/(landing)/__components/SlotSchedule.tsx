"use client";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "./DatePicker";
import ShowSlots from "./ShowSlots";
import { useTranslations } from "next-intl";
import { getAvailableSlots } from "@/app/services/operations/appointment/slots";
import { setSlotData } from "@/app/store/slices/slotSlice";
import { useAppDispatch } from "@/app/store/reduxHooks";

const SlotSchedule = () => {
  // State for selected date
  const [selectedDate, setSelectedDate] = useState<string>("");
  const t = useTranslations("SlotSchedule");

  const dispatch = useAppDispatch();

  const showSlotes = async () => {
    try {
      if (selectedDate !== "") {
        const parts = selectedDate.split("-");
        const formattedDate = `${parts[1]}-${parts[0]}-${parts[2]}`;
        const res = await getAvailableSlots(formattedDate);
        dispatch(setSlotData(res));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    showSlotes();
  }, [selectedDate]);

  return (
    <div className="mt-8">
      {/* Background image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
        style={{ backgroundImage: "url('/images/auth-side-img.webp')" }}
      ></div> */}

      {/* Content */}
      <div className="relative flex justify-center items-center h-full flex-col gap-4">
        {/* Title */}
        <h1 className="text-4xl font-RobotoFlex font-bold text-center text-customYellow">
          {t("heading")}
        </h1>

        {/* Date Picker and Slots Display */}
        <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-0">
          <DatePicker
            setSelectedDate={setSelectedDate}
            customClasses="rounded-r-full rounded-l-full  text-3xl text-black p-2 px-6"
          />
          {/* <ShowSlots
            selectedDate={selectedDate}
            scrollToSlotDetails={scrollToSlotDetails}
            customClasses="h-max sm:h-full bg-customGray hover:bg-opacity-90 transition-all duration-200 text-base font-semibold text-red-400 hover:text-red-300  rounded-r-full rounded-l-full sm:rounded-l-[0px] p-3 px-12"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SlotSchedule;
