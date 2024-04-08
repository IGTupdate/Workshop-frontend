"use client"

import { Typography } from 'antd'
import React from 'react'
import VehicleSearchCompoent from './VehicleSearchCompoent'

const { Title } = Typography

type Props = {}

const VehicleDetailContainer = (props: Props) => {
    return (
        <div>
            <div className='mb-5'>
                <Title level={5}>Fill Vehicle Details</Title>
            </div>
            <VehicleSearchCompoent />
        </div>
    )
}

export default VehicleDetailContainer