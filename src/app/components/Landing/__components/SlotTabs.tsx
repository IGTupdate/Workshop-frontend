import { useAppSelector } from "@/app/store/reduxHooks";
import { TSlot } from "@/app/types/calender";
import { TASlot, TAvailbleSlots } from "@/app/types/slot";
import { extractTimeFromDate } from "@/app/utils/dateFormatter";
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

  const handleBookAppointment = () => {
    // Logic to book an appointment goes here
    router.push(
      `/dashboard/appointment/book?slot_id=${_id}&calender_id=${calenderData?.calender_id}`,
    );
    console.log(`Slot ${_id} ${calenderData?.calender_id} booked!`);
  };

  return (
    <div className="h-[100%] flex justify-center items-center w-full sm:w-max mx-auto flex-col gap-6 bg-white rounded-xl shadow-xl p-6 mt-3">
      {authData && (
        <p className="text-xl font-bold">Hello {authData?.fullName}</p>
      )}
      <p className="text-lg font-bold">You picked a great slot for booking</p>
      <div className="flex justify-center sm:justify-between items-center flex-wrap gap-4">
        <p className="text-lg font-bold flex flex-col flex-wrap gap-2">
          <span className="text-center">Slot Timings</span>
          <span className="font-medium">
            {extractTimeFromDate(start_time)} - {extractTimeFromDate(end_time)}
          </span>
        </p>
        <p className="text-lg font-bold flex flex-col flex-wrap gap-2">
          <span className="text-center">Slot Availability</span>{" "}
          <span className="font-medium text-center">{available}</span>
        </p>
      </div>
      <button
        onClick={handleBookAppointment}
        className="bg-customGray text-customLightGray px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors duration-200 text-lg font-semibold focus:outline-none focus:ring focus:ring-blue-400"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default SlotTabs;
