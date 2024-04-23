'use client'
import { getAllServicePlans } from '@/app/services/operations/appointment/service-plans';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { useEffect } from 'react';

type Props = {};

const ServicePlanSelection = (props: Props) => {
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

    return <div>
        <Tabs defaultActiveKey="0" tabPosition="top">
        {Object.keys(servicePlansData).map(categoryId => (
            <TabPane tab={servicePlansData[categoryId].category.name} key={categoryId}>
            {servicePlansData[categoryId].plans.map(plan => (
                <div key={plan._id}>
                <h3>{plan.name}</h3>
                <p>Description: {plan.description}</p>
                <p>Price: {plan.price}</p>
                {/* Render other plan details */}
                <p>Duration: {plan.duration}</p>
                <p>Category: {plan.category.name}</p>
                <p>Tasks: {plan.tasks && plan?.tasks.map(task => task.name).join(', ')}</p>
                {/* Render other plan details */}
                </div>
            ))}
            </TabPane>
        ))}
        </Tabs>
    </div>
};

export default ServicePlanSelection;
