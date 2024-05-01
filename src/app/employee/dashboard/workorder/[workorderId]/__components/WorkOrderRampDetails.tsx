import DescriptionItem from '@/app/components/DescriptionItem.tsx';
import { TRamp } from '@/app/types/ramp'
import { Typography } from 'antd'
import React from 'react'
import WorkOrderManageRampDrawer from './WorkOrderManageRampDrawer';
import { TWorkOrder } from '@/app/types/work-order';

const { Title, Text } = Typography;


type Props = {
    ramp: string | TRamp | null
    handleUpdateWorkOrderData: (field: keyof TWorkOrder, fieldData: any) => void
}

const WorkOrderRampDetails = (props: Props) => {
    return (
        <div className='w-full'>
            <div className='flex justify-between'>
                <Title level={5}>
                    Ramp Details
                </Title>
                <WorkOrderManageRampDrawer ramp={props.ramp} handleUpdateWorkOrderData={props.handleUpdateWorkOrderData} />
            </div>
            {
                props.ramp ? <div>
                    <DescriptionItem title='Name' content={(typeof props.ramp !== "string") ? props.ramp.name : "-"} />
                    <DescriptionItem title='Location' content={(typeof props.ramp !== "string") ? props.ramp.location : "-"} />
                </div> : <Text>No Ramp Assigned</Text>
            }

        </div>
    )
}

export default WorkOrderRampDetails