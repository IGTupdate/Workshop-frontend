import { TEmployeeTableDataType } from '@/app/types/employee';
import { Table } from 'antd';
import React from 'react';
import { EmployeeTableColumns } from './EmployeeTableColumns';

type Props = {
    employees: TEmployeeTableDataType[];
};

const EmployeeTableContainer = (props: Props) => {

    return (
        <div className='overflow-hidden rounded-xl shadow-xl'>
            <Table scroll={{ x: 980 }} pagination={false} dataSource={[...props.employees].reverse()} columns={EmployeeTableColumns()} />
        </div>
    );
};

export default EmployeeTableContainer;