import { TSlot } from '@/app/types/calender';
import { TASlot, TAvailbleSlots } from '@/app/types/slot';
import { extractTimeFromDate } from '@/app/utils/dateFormatter';
import React from 'react';

interface AppointmentBookingProps {
    slotData : TASlot
}

const SlotTabs: React.FC<AppointmentBookingProps> = ({ slotData }) => {
    const { _id, start_time, end_time, available } = slotData
    const handleBookAppointment = () => {
        // Logic to book an appointment goes here
        console.log(`Slot ${_id} booked!`);
    };

    return (
    <div className='h-[100%] flex justify-center items-center w-96 mx-auto flex-col gap-6'>
        <p className=" bold-text-lg">Hello,</p>
        <p className=" bold-text-lg">You picked a great slot for booking</p>
        <p className=" bold-text-lg">Slot Timings: {extractTimeFromDate(start_time)} - {extractTimeFromDate(end_time)}</p>
        <p className=" bold-text-lg">Slot Availability: {available}</p>
        <button onClick={handleBookAppointment} className='bg-customGray text-customLightGray px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors duration-200 text-lg font-semibold focus:outline-none focus:ring focus:ring-blue-400'>
            Book Appointment
        </button>
    </div>
    );
};

export default SlotTabs;
