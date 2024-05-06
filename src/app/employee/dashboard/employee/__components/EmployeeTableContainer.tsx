import { TEmployeeTableDataType } from '@/app/types/employee'
import { Table } from 'antd'
import React from 'react'
import { EmployeeTableColumns } from './EmployeeTableColumns'

type Props = {
    employees: TEmployeeTableDataType[]
}

const EmployeeTableContainer = (props: Props) => {
    
    return (
        <div>
            <Table dataSource={props.employees} columns={EmployeeTableColumns()} />
        </div>
    )
}

export default EmployeeTableContainer