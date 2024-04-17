import React from 'react';

const NotificationCard = () => {
    return (
        <div className='mt-6'>
            <h3 className='font-lg font-bold'>Notifications</h3>

            <ul className='mt-4 flex flex-col gap-3'>
                <li className='relative ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300'>Lorem ipsum, dolor sit amet</li>
                <li className='relative ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300'>Lorem ipsum, dolor sit amet consectetur adipisicing</li>
            </ul>
        </div>
    );
};

export default NotificationCard;
