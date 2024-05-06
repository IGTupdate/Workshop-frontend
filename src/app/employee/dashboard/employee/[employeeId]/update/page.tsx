
"use client";
import React from 'react';
import UpdateEmployeeForm from './__components/UpdateEmployeeForm';
import { useParams } from 'next/navigation';

type Props = {};

const Page = (props: Props) => {
    const params = useParams();


    return (
        <div>
            <div className="flex justify-between items-center mb-8 bg-white rounded-xl p-4">
                <h2 className="text-xl font-semibold">Update Employee</h2>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-xl">
                <UpdateEmployeeForm employeeId={params?.employeeId as string} />
            </div>
        </div>
    );
};

export default Page;