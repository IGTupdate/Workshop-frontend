import DescriptionItem from '@/app/components/DescriptionItem.tsx';
import Watermark from '@/app/components/Text/WatermarkText';
import { TEmployeeWorkStatus } from '@/app/types/employee';
import { Divider, Drawer, Typography } from 'antd';
import React, { useState } from 'react';

const { Title } = Typography;


type Props = {
    activeAdvisor: TEmployeeWorkStatus | null;
    setActiveAdvisor: React.Dispatch<React.SetStateAction<TEmployeeWorkStatus | null>>;
};


const AdvisorDetailDrawer = (props: Props) => {


    const handleCloseDrawer = () => {
        props.setActiveAdvisor(null);
    };

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
                                <div className="flex flex-col">
                                    <h3 className='font-semibold'>Name</h3>
                                    <p>{props.activeAdvisor.fullName}</p>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className='font-semibold'>Assigned Work Order</h3>
                                    <p>{props.activeAdvisor.assigned_workOrder.length}</p>
                                </div>
                                {/* <DescriptionItem title={"Name"} content={props.activeAdvisor.fullName} />
                                <DescriptionItem title='Assigned Work Order' content={props.activeAdvisor.assigned_workOrder.length} /> */}
                            </div>
                            <Divider className='my-4' />
                            <div>
                                <Title level={5} className='mb-4 text-base font-bold'>Assigned Work Order</Title>
                                <ul className=''>
                                    {
                                        props.activeAdvisor && props.activeAdvisor.assigned_workOrder.length > 0 ?
                                            props.activeAdvisor.assigned_workOrder.map((el, index) => {

                                                return <div key={index} className="flex justify-between items-center pb-4">
                                                    <div className={`flex w-1/2 flex-col ps-6 relative before:content-[''] before:absolute ${(props.activeAdvisor && (props.activeAdvisor.assigned_workOrder.length - 1)) === index ? 'before:h-0' : 'before:h-full'} before:w-[1px] before:bg-slate-300 before:left-[0.2em] before:top-[1.15rem]
                                                    `}>
                                                        <h3 className='font-medium relative before:content-[""] before:absolute before:h-2 before:w-2 before:rounded-full before:bg-customYellow before:left-[-1.8em] before:top-1/2 before:translate-y-[-50%]'>Estimated Time</h3>
                                                        <p>{el.estimatedTimeOfCompletion ? new Date(el.estimatedTimeOfCompletion).toLocaleTimeString() : "Time is unavailable"}</p>
                                                    </div>
                                                    <div className="flex w-1/2 flex-col">
                                                        <h3 className='font-medium'>Ramp</h3>
                                                        <p>{(el.ramdId && typeof el.ramdId !== "string" ? el.ramdId.name : "Ramp is unavailable")}</p>
                                                    </div>
                                                </div>;


                                                {/* <div className='grid grid-cols-2 mb-4 '>
                                                        <DescriptionItem
                                                            title={"Estimated Time"}
                                                            content={el.estimatedTimeOfCompletion ? new Date(el.estimatedTimeOfCompletion).toLocaleTimeString() : "-"} />

                                                        <DescriptionItem
                                                            title={"Ramp"}
                                                            content={(el.ramdId && typeof el.ramdId !== "string" && el.ramdId.name)} />
                                                    </div> */}

                                            }) : <div className="relative mt-8">
                                                <Watermark text='No Assigned Work order found' />
                                            </div>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div > : <>No Advisor Found</>
                }
            </Drawer >

        </div >
    );
};

export default AdvisorDetailDrawer;