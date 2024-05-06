import React from 'react'
import EmployeeViewpageContainer from './EmployeeViewpageContainer'

type Props = {
    params: {
        employeeId: string
    }
}

const page = (props: Props) => {
    return (
        <div className='p-4 bg-white rounded-md'>
            <div className='mb-4'>
                <h2 className="text-xl font-semibold">Employee Details</h2>
            </div>
            <EmployeeViewpageContainer employeeId={props.params.employeeId} />
        </div>
    )
}

export default page