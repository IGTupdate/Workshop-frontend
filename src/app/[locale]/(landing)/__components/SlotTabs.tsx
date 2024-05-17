import { useAppSelector } from "@/app/store/reduxHooks";
import { TSlot } from "@/app/types/calender";
import { TASlot, TAvailbleSlots } from "@/app/types/slot";
import { extractTimeFromDate } from "@/app/utils/dateFormatter";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

interface AppointmentBookingProps {
  slotData: TASlot;
  calenderData: TAvailbleSlots | null;
}

const SlotTabs: React.FC<AppointmentBookingProps> = ({
  slotData,
  calenderData,
}) => {
  const { _id, start_time, end_time, available } = slotData;
  const { authData } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const t = useTranslations("SlotTabs");

  const handleBookAppointment = () => {
    // Logic to book an appointment goes here
    localStorage.removeItem("appointmentBookingData");
    router.push(
      `/dashboard/appointment/book?slot_id=${_id}&calender_id=${calenderData?.calender_id}`,
    );
  };

  return (
    <div className="h-[100%] flex justify-center items-center w-full sm:w-max mx-auto flex-col gap-6 bg-transparent rounded-xl shadow-3xl p-0 sm:p-8 my-3">
      {authData && (
        <p className="text-xl font-RobotoFlex font-bold text-center text-white">
          {t("heading")} {authData?.fullName}
        </p>
      )}
      <p className="text-lg font-RobotoFlex font-bold text-center text-white">
        {t("headingTwo")}
      </p>
      <div className="flex justify-center sm:justify-between items-center flex-wrap gap-4">
        <p className="text-lg font-bold flex flex-col flex-wrap gap-2 text-white">
          <span className="text-center font-RobotoFlex">{t("timings")}</span>
          <span className="font-medium font-RobotoFlex text-center">
            {extractTimeFromDate(start_time)} - {extractTimeFromDate(end_time)}
          </span>
        </p>
        <p className="text-lg font-bold flex flex-col flex-wrap gap-2 text-white">
          <span className="text-center font-RobotoFlex">
            {t("availability")}
          </span>{" "}
          <span className="font-medium font-RobotoFlex text-center">
            {available}
          </span>
        </p>
      </div>
      <button
        onClick={handleBookAppointment}
        className="bg-customYellow text-black font-Inter font-medium sm:font-semibold text-base sm:text-xl  px-10 py-2 mt-8 rounded-full hover:bg-matalicYellow"
      >
        {t("button")}
      </button>
    </div>
  );
};

export default SlotTabs;
