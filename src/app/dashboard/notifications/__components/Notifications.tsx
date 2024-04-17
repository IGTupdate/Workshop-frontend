import React from 'react';
import { notificationData } from "../../../../../public/fackData.js";

interface NotificationItem {
    heading: string,
    sub: string;
    // Add other properties if present in your fake data
}

const Notifications = () => {
    return (
        <div className='mt-4'>
            <div className="heading relative  before:content-[''] before:absolute before:right-0 before:top-1/2 before:translate-y-[-50%] before:w-9/12 before:h-2 before:bg-gradient-to-r before:from-[#FFE301] before:to-[#A79638]">
                <h2 className='text-xl font-bold'>History</h2>
            </div>

            <ul className={`relative ${notificationData.length > 3 && 'before:content-[""] before:h-16'} before:absolute before:right-0 before:bottom-0 before:w-full before:bg-gradient-to-t before:from-[#f5f5f5] before:to-transparent`}>
                {
                    notificationData.map((item: NotificationItem, index: number) => (
                        <li key={index} className='ps-10 mt-4'>
                            <h3 className='font-semibold text-base relative before:content-[""] before:absolute before:left-[-35px] before:top-1/2 before:translate-y-[-50%] before:w-[15px] before:h-[15px] before:rounded-full before:bg-[#FFE301]'>{item.heading}</h3>

                            <p>{item.sub}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Notifications;
