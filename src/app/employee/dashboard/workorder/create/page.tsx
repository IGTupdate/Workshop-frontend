"use client";

import React from 'react'
import CreateWorkOrder from './__components/CreateWorkOrder';

type Props = {
    searchParams: { [key: string]: string | undefined }
}

const page = (props: Props) => {

    return (
        <div className='p-4 bg-white rounded-md'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create WorkOrder</h2>
            </div>
            <CreateWorkOrder appointmentId={props.searchParams.appointmentId} />
        </div>
    )
}

export default page