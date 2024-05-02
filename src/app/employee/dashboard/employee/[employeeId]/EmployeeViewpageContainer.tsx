"use client";

import DescriptionItem from '@/app/components/DescriptionItem.tsx';
import React, { useEffect, useState } from 'react'

type Props = {
    employeeId: string
}

function EmployeeViewpageContainer(props: Props) {

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, [props.employeeId])


    return (
        <div>

            <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                <DescriptionItem title='FirstName' content='Puneet' />
                <DescriptionItem title='LastName' content='Puneet' />
                <DescriptionItem title='Email' content='Puneet' />
                <DescriptionItem title='Phone' content='Puneet' />
                <DescriptionItem title='Password' content='Puneet' />
                <DescriptionItem title='Role' content='Puneet' />
                <div className='col-span-2'>
                    <DescriptionItem title='Address' content='Indore MP' />
                </div>
            </div>

        </div>
    )
}

export default EmployeeViewpageContainer