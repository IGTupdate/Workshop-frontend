import { Button } from 'antd'
import React from 'react'
import SlotScheduleContainer from './__components/SlotScheduleContainer'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='p-4 bg-white rounded-md'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Slot Schedule</h2>
                <Button className='bg-blue1 text-white1 font-medium text-md'>Create</Button>
            </div>
            <div className='mt-8'>
                <SlotScheduleContainer />
            </div>
        </div>
    )
}

export default page