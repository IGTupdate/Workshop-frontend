"use client";

import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { GetWorkOrderTableColumn } from './GetWorkOrderTableColumn';
import { Tag } from "antd";
import { TWorkOrder, TWorkOrderDataTable } from '@/app/types/work-order';

type Props = {
    workOrderData: TWorkOrder[];
};

const WorkOrderTableContainer = (props: Props) => {

    const [workOrderTableData, setWorkOrderTableData] = useState<
        TWorkOrderDataTable[]
    >([]);

    useEffect(() => {
        setWorkOrderTableData((prv) => {
            return props.workOrderData.map((el) => {
                return {
                    key: el._id,
                    orderNumber: el.orderNumber,
                    vehicle_registeration_number: (el.appointmentId && typeof el.appointmentId !== "string" ?
                        (typeof el.appointmentId.vehicle_id !== "string" ?
                            el.appointmentId.vehicle_id.registeration_number : "") : "") || "",
                    status: el.status,
                    _id: el._id,
                    createdAt: new Date(el.createdAt)
                };
            });
        });
    }, [props.workOrderData]);

    return (
        <div>
            <Table
                sticky={true}
                pagination={false}
                columns={GetWorkOrderTableColumn()}
                dataSource={workOrderTableData}
                scroll={{ x: 980 }}
            />
        </div>
    );
};

export default WorkOrderTableContainer;