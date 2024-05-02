import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import EmployeesViewPageContainer from './__components/EmployeesViewPageContainer'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='p-4 bg-white rounded-md'>

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">Manage Employee</h2>
                <Link
                    href={`/employee/dashboard/employee/create`}
                >
                    <Button type='primary'>Create Employee</Button>
                </Link>
            </div>
            <div>
                <EmployeesViewPageContainer />
            </div>
        </div>
    )
}

export default page