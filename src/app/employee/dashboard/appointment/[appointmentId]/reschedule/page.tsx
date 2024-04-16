import React from 'react'
import RescheduleAppointmentContainer from './__components/RescheduleAppointmentContainer'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='p-4 bg-white rounded-md'>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">Reschedule Appointment</h2>
            </div>
            <RescheduleAppointmentContainer />

        </div>
    )
}

export default page