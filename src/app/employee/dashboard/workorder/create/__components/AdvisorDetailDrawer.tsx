import DescriptionItem from '@/app/components/DescriptionItem.tsx'
import Watermark from '@/app/components/Text/WatermarkText';
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
                                                    <div className='grid grid-cols-2 mb-4 '>
                                                        <DescriptionItem
                                                            title={"Estimated Time"}
                                                            content={el.estimatedTimeOfCompletion ? new Date(el.estimatedTimeOfCompletion).toLocaleTimeString() : "-"} />

                                                        <DescriptionItem
                                                            title={"Ramp"}
                                                            content={(el.ramdId && typeof el.ramdId !== "string" && el.ramdId.name)} />
                                                    </div>
                                                    <Divider />
                                                </li>
                                            }) : <div className="relative mt-8">
                                                <Watermark text='No Assigned Work order found'/>
                                            </div>
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