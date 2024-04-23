'use client';
import { getAllServicePlans } from '@/app/services/operations/appointment/service-plans';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { minutesToHoursConverter, PriceCalculator } from '@/app/utils/helper';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { useEffect } from 'react';

import ServicePlans from './ServicePlans';



const ServicePlanSelection: React.FC<Props> = (props) => {
    const { servicePlansLoading, servicePlansData } = useAppSelector((state) => state.servicePlan);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (servicePlansLoading) {
            dispatch(getAllServicePlans()); // Correctly call the action creator
        }
    }, [servicePlansLoading]);


    // This effect will run when servicePlansData changes
    useEffect(() => {
        console.log(servicePlansData);
    }, [servicePlansData]);

    return (
        <div>
            <Tabs defaultActiveKey="0" tabPosition="top">
                {Object.keys(servicePlansData).map(categoryId => (
                    <TabPane tab={servicePlansData[categoryId].category.name} key={categoryId}>
                        {servicePlansData[categoryId].plans.map(plan => (
                            <ServicePlans key={plan._id} plan={plan} />
                        ))}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};

export default ServicePlanSelection;
