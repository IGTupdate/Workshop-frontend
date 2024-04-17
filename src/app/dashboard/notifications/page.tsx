import React from 'react';
import StepBar from './__components/StepBar';
import Notifications from './__components/Notifications';

const page = () => {
    return (
        <div className='h-screen pt-20 pb-32 px-4 md:py-0 overflow-auto'>
            {/* step bar */}
            <StepBar />

            {/* notifications */}
            <Notifications />
        </div>
    );
};

export default page;
