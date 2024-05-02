"use client";

import { TEmployee, TEmployeeTableDataType } from '@/app/types/employee'
import React, { useEffect, useState } from 'react'
import Loader from '@/app/components/Loader';
import { getAllEmployees } from '@/app/services/operations/auth/employeeAuth';
import EmployeeTableContainer from './EmployeeTableContainer';

type Props = {}

const EmployeesViewPageContainer = (props: Props) => {

    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState<TEmployeeTableDataType[]>([]);

    useEffect(() => {
        (async function () {
            try {
                const response = await getAllEmployees() as TEmployee[];

                console.log(response);

                return setEmployees(() => {
                    return response.map((el) => {
                        return {
                            fullName: el.fullName,
                            _id: el._id,
                            status: "",
                            email: el.email,
                            role: el.roleId,
                            contactNumber: ""
                        }
                    })
                })

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }());
    }, [])


    return (
        <div>

            {
                loading ? <div>
                    <Loader />
                </div> : <div>
                    <EmployeeTableContainer employees={employees} />
                </div>
            }
        </div>
    )
}

export default EmployeesViewPageContainer