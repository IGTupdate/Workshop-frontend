"use client";
import React from 'react';
import dayjs from 'dayjs';

type Slot = {
    _id: string;
    start_time: string;
    // Add any other properties of a slot here
};

type Item = {
    calender_id: {
        slots: Slot[];
    };
    slot_id: string;
    status: string;
    // Add any other properties of an item here
};

type Props = {
    item: Item;
};

const AppointmentContent: React.FC<Props> = ({ item }) => {

    const data = item?.calender_id?.slots?.filter(slot => slot._id === item.slot_id);

    return (
        <>
            <div className='bg-gradient-to-r from-[#FFE301] to-[#D7C000] rounded-2xl p-4 min-h-[121px] shadow-3d'>
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className='text-white text-2xl font-bold'>{item.status}</h4>
                        <h4 className='text-white text-xl font-semibold'>Admission: <span className='text-base font-normal'>{
                            data?.length > 0 && dayjs(data[0]?.start_time).format('MM/DD/YYYY')
                        }</span></h4>

                    </div>

                    <div>
                        <h4 className='text-white text-xl font-semibold text-center'>
                            Time
                        </h4>
                        <h4 className='text-white text-5xl font-bold'>{
                            data?.length > 0 && dayjs(data[0]?.start_time).format("HH:mm")
                        }</h4>
                    </div>
                </div>

            </div>

        </>
    );
};

export default AppointmentContent;
