'use client'

import BookAppointmentContainer from "./__components/BookAppointmentCalender"

type Props = {}

const page = (props: Props) => {

  return (
    <div className=' flex flex-col gap-4 pb-4'>
        <h1 className=' text-lg font-bold'>Book Appointment</h1>
        <div>
          <BookAppointmentContainer/>
        </div>
    </div>
  )
}

export default page