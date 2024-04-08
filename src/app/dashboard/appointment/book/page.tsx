'use client'
import LandingDatePicker from '@/app/components/Landing/__components/DatePicker'
import ShowSlots from '@/app/components/Landing/__components/ShowSlots'
import SlotDetails from '@/app/components/Landing/__components/SlotDetails'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

type Props = {}

const page = (props: Props) => {
    const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('DD-MM-YYYY'));
    useEffect(() => {
      console.log(selectedDate)
    },[selectedDate])
  return (
    <div className=' flex flex-col gap-4 pb-4'>
        <h1 className=' text-lg font-bold'>Book Appointment</h1>
        <div className="flex w-[550px] justify-center items-center">
          <LandingDatePicker setSelectedDate={setSelectedDate} customClasses='text-xl text-black py-2 px-4' />
        </div>
        <div>
          <SlotDetails/>
        </div>
    </div>
  )
}

export default page