import React from 'react';

const AppointmentCard = () => {
    return (
        <div className='bg-gradient-to-r from-[#FFE301] to-[#D7C000] rounded-2xl p-4'>
            <div className="flex justify-between items-center">
                <div>
                    <h4 className='text-white text-lg'>Active appointment</h4>
                    <h4 className='text-white text-lg'>Admission: 03/042024</h4>
                    <h4 className='text-white text-lg'>Delivery: 03/042024</h4>
                </div>

                <div>
                    <h4 className='text-white text-lg'>Delivery</h4>
                    <h4 className='text-white text-5xl font-bold'>15:03</h4>
                </div>
            </div>

        </div>
    );
};

export default AppointmentCard;

