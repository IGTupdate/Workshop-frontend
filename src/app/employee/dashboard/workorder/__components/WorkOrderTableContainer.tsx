import { Table } from 'antd'
import React from 'react'
import  { GetWorkOrderTableColumn } from './GetWorkOrderTableColumn'
import { Tag } from "antd";

type Props = {}

const WorkOrderTableContainer = (props: Props) => {
    return (
        <div>
            <Table
                sticky={true}
                pagination={false}
                columns={GetWorkOrderTableColumn()}
                dataSource={[]}
            />

        </div>
    )
}

export default WorkOrderTableContainer