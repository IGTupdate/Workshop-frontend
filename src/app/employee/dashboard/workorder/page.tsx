import Link from 'next/link'
import React from 'react'
import WorkOrderPageContainer from './__components/WorkOrderPageContainer'
import { Button } from 'antd';

type Props = {}

const page = (props: Props) => {
    return (
        <div >
            <div className="flex justify-between items-center p-4 bg-white rounded-xl mb-8">
                <h2 className="text-xl font-semibold">Manage WorkOrders</h2>
                <Link
                    href={`/employee/dashboard/workorder/create`}
                >
                    <Button type='primary'>Create WorkOrder</Button>
                </Link>
            </div>

            <WorkOrderPageContainer />
        </div>
    )
}

export default page