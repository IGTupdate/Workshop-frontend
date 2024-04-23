import { Descriptions } from 'antd'
import React from 'react'

type Props = {}

const WorkOrderCustomerDetails = (props: Props) => {
    return (
        <div>
            <Descriptions column={2}>
                <Descriptions.Item label="Name">Puneet</Descriptions.Item>
                <Descriptions.Item label="Phone Number">7024645034</Descriptions.Item>
                <Descriptions.Item label="Email">pdwivedi</Descriptions.Item>
                <Descriptions.Item label="Vehicle Reg No">MP09AB1234</Descriptions.Item>
                <Descriptions.Item label="VIN">SDFEFEF959595</Descriptions.Item>
                <Descriptions.Item label="Make">Honda</Descriptions.Item>
                <Descriptions.Item label="Model">I20</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default WorkOrderCustomerDetails