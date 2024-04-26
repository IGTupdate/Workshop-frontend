"use client";

import SelectField from '@/app/components/Input/SelectField';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { TworkorderPrepare } from '@/app/validators/workorder';
import { useEffect, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import ServicePlanDetailContainer from '../../__components/ServicePlanDetailContainer';
import { getAllServicePlans } from '@/app/services/operations/appointment/service-plans';

type Props = {
    errors: any,
    setValue: any,
    watch: UseFormWatch<TworkorderPrepare>
}

const SelectServicePlanForWorkOrder = (props: Props) => {

    const servicePlansStore = useAppSelector((state) => state.servicePlan);
    const [servicePlanOptions, setServicePlanOptions] = useState<{ value: string, label: string }[]>([]);

    const dispatch = useAppDispatch();

    console.log(servicePlansStore.servicePlansData)

    useEffect(() => {
        if (servicePlansStore.servicePlansLoading) {
            dispatch(getAllServicePlans())
        }
    }, [servicePlansStore.servicePlansLoading])

    useEffect(() => {
        console.log(servicePlansStore.servicePlansData);
        setServicePlanOptions((prv) => {
            return servicePlansStore.servicePlansData.map((plan) => {
                const label = (typeof plan.category === "string") ? plan.name : `${plan.category.name} - ${plan.name}`
                return {
                    label,
                    value: plan._id
                }
            })
        })
    }, [servicePlansStore.servicePlansData]);

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