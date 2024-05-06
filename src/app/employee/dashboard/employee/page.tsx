import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import EmployeesViewPageContainer from './__components/EmployeesViewPageContainer';

type Props = {};

const page = (props: Props) => {
    return (
        <div>

            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl">
                <h2 className="text-xl font-semibold">Manage Employee</h2>
                <Link
                    href={`/employee/dashboard/employee/create`}
                >
                    <Button type='primary'>Create Employee</Button>
                </Link>
            </div>
            <div>
                <EmployeesViewPageContainer />
            </div>
        </div>
    );
};

export default page;