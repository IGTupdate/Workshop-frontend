import { Typography } from 'antd'
import React from 'react'

const { Title, Text } = Typography
type Props = {
    observations: string[]
}

const WorkOrderObservations = (props: Props) => {
    return (
        <div className='my-4'>
            <Title level={5}>Observations</Title>
            {
                props.observations.length > 0 ? <ul>
                    {
                        props.observations.map((el, index) => {
                            return <li key={index} className='relative flex items-center gap-4 ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300'>
                                <p>{el}</p>
                            </li>
                        })
                    }
                </ul> : <Text>No Observations</Text>
            }

        </div>
    )
}

export default WorkOrderObservations