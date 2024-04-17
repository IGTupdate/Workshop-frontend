import Link from 'next/link'
import React from 'react'
import WorkOrderPageContainer from './__components/WorkOrderPageContainer'

type Props = {}

const page = (props: Props) => {
    return (
        <div className="p-4 bg-white rounded-md">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">Manage WorkOrders</h2>
                <Link
                    href={`/employee/dashboard/workorder/create`}
                    className="bg-customYellow text-white1 font-medium text-md px-4 py-2 rounded-md"
                >
                    Create WorkOrder
                </Link>
            </div>

            <WorkOrderPageContainer />
        </div>
    )
}

export default page