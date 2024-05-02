import DescriptionItem from '@/app/components/DescriptionItem.tsx';
import { TEmployee } from '@/app/types/employee';
import { Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

type Props = {
    advisor: string | TEmployee;
};

const WorkOrderAdvisorDetails = (props: Props) => {
    return (
        <div>
            <div className='flex justify-between'>
                <Title level={5}>
                    Advisor Details
                </Title>
            </div>
            <div>
                <h3 className='font-semibold'>Name</h3>
                <p>{(typeof props.advisor === "string" ? "-" : props.advisor.fullName)}</p>
                {/* <DescriptionItem title='Name' content={(typeof props.advisor === "string" ? "-" : props.advisor.fullName)}/> */}
            </div>
        </div>
    );
};

export default WorkOrderAdvisorDetails;