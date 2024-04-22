"use client";
import React from 'react';
import dayjs from 'dayjs';
const AppointmentContent = ({ item }) => {

    const data = item.calender_id.slots.filter(slot => slot._id == item.slot_id);

    console.log(data);

    return (
        <div className='bg-gradient-to-r from-[#FFE301] to-[#D7C000] rounded-2xl p-4 min-h-[121px]'>
            <div className="flex justify-between items-center">
                <div>
                    <h4 className='text-white text-2xl font-bold'>{item.status}</h4>
                    <h4 className='text-white text-xl font-semibold'>Admission: <span className='text-base font-normal'>{
                        dayjs(data[0]?.start_time).format('MM/DD/YYYY')
                    }</span></h4>

                    {
                        item.status === "Assigned" || item.status === "Scheduled" ? "" : <h4 className='text-white text-xl font-semibold'>Delivery: <span className='text-base font-normal'>03/04/2024</span></h4>
                    }

                </div>

                <div>
                    <h4 className='text-white text-xl font-semibold text-center'>{
                        item.status === "Assigned" || item.status === "Scheduled" ? "Time" : "Delivery"
                    }</h4>
                    <h4 className='text-white text-5xl font-bold'>{
                        item.status === "Assigned" || item.status === "Scheduled" ? dayjs(data[0]?.start_time).format("HH:MM") : "15:00"
                    }</h4>
                </div>
            </div>

        </div>
    );
};

export default AppointmentContent;
