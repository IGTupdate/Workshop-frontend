"use client";
import Link from 'next/link';
import React from 'react';
import WorkOrderPageContainer from './__components/WorkOrderPageContainer';
import { Button } from 'antd';
import useAbility from '@/app/__hooks/useAbility';
import { casl_action, casl_subject } from '@/app/utils/casl/constant';

type Props = {};

const Page = (props: Props) => {
    const ability = useAbility();
    return (
        <div >
            <div className="flex justify-between items-center p-4 bg-white rounded-xl mb-8">
                <h2 className="text-xl font-semibold">Manage Work Orders</h2>
                <Link
                    href={`/employee/dashboard/workorder/create`}
                >
                    {ability && ability.can(casl_action.create, casl_subject.workorder) && <Button type='primary'>Create WorkOrder</Button>}
                </Link>
            </div>

            <WorkOrderPageContainer />
        </div >
    );
};

export default Page;