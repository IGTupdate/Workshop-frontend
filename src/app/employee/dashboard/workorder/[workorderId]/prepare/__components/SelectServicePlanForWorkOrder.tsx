"use client";

import SelectField from '@/app/components/Input/SelectField'
import React, { useEffect, useState } from 'react'
import ServicePlanDetailContainer from '../../__components/ServicePlanDetailContainer'
import { demoserviceplans } from './__demoserviceplans'
import { TServicePlans } from '@/app/types/service'
import { UseFormWatch } from 'react-hook-form';
import { TworkorderPrepare } from '@/app/validators/workorder';

type Props = {
    errors: any,
    setValue: any,
    watch: UseFormWatch<TworkorderPrepare>
}

const SelectServicePlanForWorkOrder = (props: Props) => {

    const servicePlans = demoserviceplans as TServicePlans[];

    const [servicePlanOptions, setServicePlanOptions] = useState<{ value: string, label: string }[]>([]);

    useEffect(() => {
        setServicePlanOptions((prv) => {
            return servicePlans.map((plan) => {
                const label = (typeof plan.category === "string") ? plan.name : `${plan.category.name} - ${plan.name}`
                return {
                    label,
                    value: plan._id
                }
            })
        })
    }, [servicePlans]);

    return (
        <div>
            <div className='md:w-1/2 mb-4'>
                <SelectField
                    mode={"multiple"}
                    name={"servicePlanId"}
                    placeholder={"Select Service Plans"}
                    error={props.errors["servicePlanId"] ? props.errors["servicePlanId"]?.message || "" : ""}
                    label={"Service Plan"}
                    setValue={props.setValue}
                    options={servicePlanOptions}
                    defaultValue={props.watch("servicePlanId")}
                />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                {
                    props.watch("servicePlanId").map((planId) => {
                        return <ServicePlanDetailContainer key={planId} servicePlan={planId} />
                    })
                }

            </div>
        </div>

    )
}

export default SelectServicePlanForWorkOrder