"use client";

import { Button, Typography } from 'antd'
import React, { useState } from 'react'
import RequestAdditonalWorkDrawerContainer from './RequestAdditonalWorkDrawerContainer';
import { TAdditonalWorkRequest } from '@/app/types/work-order';

const { Title } = Typography

type Props = {}

const AdditionalWorkRequest = (props: Props) => {

    const [] =useState<TAdditonalWorkRequest[]>([]) 


    return (
        <div>
            <div className='flex justify-between items-center'>
                <Title level={5}>Additional Work</Title>
                <RequestAdditonalWorkDrawerContainer />
            </div>
            <div>

                



            </div>
        </div>
    )
}

export default AdditionalWorkRequest