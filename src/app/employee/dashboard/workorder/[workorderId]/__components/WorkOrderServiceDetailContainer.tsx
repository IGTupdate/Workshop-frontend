import DescriptionItem from '@/app/components/DescriptionItem.tsx'
import { TWorkOrder } from '@/app/types/work-order'
import { Typography } from 'antd'
import React from 'react'
const { Title } = Typography

type Props = {
    workOrder: TWorkOrder
}

const WorkOrderServiceDetailContainer = (props: Props) => {
    return (
        <div>
            <Title level={5}>Service Details</Title>

            <div className='grid md:grid-cols-2 grid-cols-1 gap-3 mb-3'>
                <DescriptionItem title='Odometer Reading' content={props.workOrder.odometerReading} />
                <DescriptionItem title='Fuel Quantity' content={props.workOrder.fuelQuantity} />
                <DescriptionItem title='Estimated Deliver Time' content={`
                ${new Date(props.workOrder.estimatedTimeOfCompletion || "").toDateString()} 
                ${new Date(props.workOrder.estimatedTimeOfCompletion || "").toLocaleTimeString()}
                `} />
                <DescriptionItem title='Estimated Service Cost' content={props.workOrder.estimatedCost} />
            </div>
            <DescriptionItem title='Notes' content={props.workOrder.notes} />
        </div>
    )
}

export default WorkOrderServiceDetailContainer