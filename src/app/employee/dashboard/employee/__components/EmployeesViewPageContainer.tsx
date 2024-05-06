"use client";

import { TEmployee, TEmployeeTableDataType } from '@/app/types/employee';
import React, { useEffect, useState } from 'react';
import Loader from '@/app/components/Loader';
import { getAllEmployees } from '@/app/services/operations/auth/employeeAuth';
import EmployeeTableContainer from './EmployeeTableContainer';
import { calc } from 'antd/es/theme/internal';

type Props = {};

const EmployeesViewPageContainer = (props: Props) => {

    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState<TEmployeeTableDataType[]>([]);

    useEffect(() => {
        (async function () {
            try {
                const response = await getAllEmployees() as TEmployee[];

                return setEmployees(() => {
                    return response.map((el) => {
                        return {
                            fullName: el.fullName,
                            _id: el._id,
                            status: el.status || "",
                            email: el.email,
                            role: el.role || '',
                            contactNumber: el.contactNumber || ""
                        };
                    });
                });

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }());
    }, []);


    return (
        <div>

            {
                loading ? <div style={{ height: 'calc(100vh - 300px)' }} className='flex justify-center items-center w-full'>
                    <Loader />
                </div> : <div>
                    <EmployeeTableContainer employees={employees} />
                </div>
            }
        </div>
    );
};

export default EmployeesViewPageContainer;