import React from 'react'
import UpdateEmployeeForm from './__components/UpdateEmployeeForm'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Update Employee</h2>
            </div>

            <UpdateEmployeeForm />
        </div>
    )
}

export default page