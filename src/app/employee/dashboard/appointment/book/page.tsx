import Link from 'next/link'
import React from 'react'
import BookAppointmentContainer from './__components/BookAppointmentContainer'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='p-4 bg-white rounded-md'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Book Appointment</h2>
            </div>
            <BookAppointmentContainer />
        </div>
    )
}

export default page