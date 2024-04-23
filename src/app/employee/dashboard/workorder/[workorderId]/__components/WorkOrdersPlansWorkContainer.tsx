import React from 'react'
import ServicePlanDetailContainer from './ServicePlanDetailContainer'
import { Typography } from 'antd'
import { TServicePlans } from '@/app/types/service'
import { TTask } from '@/app/types/work-order'
const { Title } = Typography

type Props = {
    servicePlanId: string[] | TServicePlans[]
    tasks: TTask[]
}

const WorkOrdersPlansWorkContainer = (props: Props) => {
    return (
        <div>
            <Title level={5}>Work to be done</Title>
            <div>
                <h2 className='mb-2'>Service Plans Opted</h2>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                    {
                        props.servicePlanId.map((plan, index)=>{
                            return <ServicePlanDetailContainer key={index} servicePlan={plan}/>
                        })
                    }
                </div>

                <h2 className='my-2'>More Works</h2>
                <ul>
                    {
                        props.tasks.map((el, index) => {
                            return <li key={index} className='relative flex items-center gap-4 ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300'>
                                <p>{el.title}</p>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default WorkOrdersPlansWorkContainer