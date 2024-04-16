import DescriptionItem from '@/app/components/DescriptionItem.tsx'
import { TEmployeeWorkStatus } from '@/app/types/employee'
import { Divider, Drawer, Typography } from 'antd'
import React, { useState } from 'react'

const { Title } = Typography


type Props = {
    activeAdvisor: TEmployeeWorkStatus | null
    setActiveAdvisor: React.Dispatch<React.SetStateAction<TEmployeeWorkStatus | null>>
}


const AdvisorDetailDrawer = (props: Props) => {


    const handleCloseDrawer = () => {
        props.setActiveAdvisor(null);
    }

    return (
        <div className='w-full'>
            <Drawer title="Advisor Detail"
                onClose={handleCloseDrawer}
                open={props.activeAdvisor !== null}
                width={480}
            >
                {
                    props.activeAdvisor ? <div>
                        <div className=''>
                            <div className='grid grid-cols-2'>
                                <DescriptionItem title={"Name"} content={props.activeAdvisor.fullName} />
                                <DescriptionItem title='Assigned WorkOrder' content={props.activeAdvisor.assigned_workOrder.length} />
                            </div>
                            <Divider className='my-4' />
                            <div>
                                <Title level={5}>Assigned WorkOrder</Title>
                                <ul className='list-disc'>
                                    {
                                        props.activeAdvisor.assigned_workOrder.length > 0 ?
                                            props.activeAdvisor.assigned_workOrder.map((el, index) => {
                                                return <li key={index}>
                                                    <DescriptionItem title={"Estimated Time"} content={el.estimatedTimeOfCompletion ? new Date(el.estimatedTimeOfCompletion).toLocaleTimeString() : "-"} />
                                                </li>
                                            }) : <>No Assigned Work order found</>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div> : <>No Advisor Found</>
                }
            </Drawer>

        </div>
    )
}

export default AdvisorDetailDrawer