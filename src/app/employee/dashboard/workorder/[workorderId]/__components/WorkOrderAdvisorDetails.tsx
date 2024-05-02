import DescriptionItem from '@/app/components/DescriptionItem.tsx'
import { TEmployee } from '@/app/types/employee'
import { Typography } from 'antd'
import React from 'react'

const { Title } = Typography

type Props = {
    advisor: string | TEmployee
}

const WorkOrderAdvisorDetails = (props: Props) => {
    return (
        <div>
            <div className='flex justify-between'>
                <Title level={5}>
                    Advisor Details
                </Title>
            </div>
            <div>
                <DescriptionItem title='Name' content={(typeof props.advisor === "string" ? "-" : props.advisor.fullName)}/>
            </div>
        </div>
    )
}

export default WorkOrderAdvisorDetails