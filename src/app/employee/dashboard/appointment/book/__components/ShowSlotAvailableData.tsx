"use client"

import { TSlot } from '@/app/types/calender'
import { TASlot, TAvailbleSlots } from '@/app/types/slot'
import { TSlotDetail } from '@/app/types/slot-schedule'
import { setQueryParams } from '@/app/utils/helper'
import { Button, Space, Table, TableProps, Tag, Typography } from 'antd'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const { Title, Text } = Typography

type Props = {
    availableSlot: TAvailbleSlots | null
}

const ShowSlotAvailableData = (props: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [talbeRows, setTableRows] = useState<any>([])
    useEffect(() => {
        setTableRows(() => {
            return props.availableSlot?.available_slots.map((el, index) => {
                return {
                    ...el,
                    key: index,
                }
            })
        })
    }, [props.availableSlot]);

    const handleProceedClick = (slot_id: string, calender_id: string) => {
        let queryParams = setQueryParams(searchParams.toString(), "slot_id", slot_id);
        queryParams = setQueryParams(queryParams, "calender_id", calender_id);
        router.push(`${pathname}?${queryParams}`);
    }

    const columns: TableProps<TASlot>['columns'] = [
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            key: 'start_time',
            render: (text) => {
                return new Date(text).toLocaleTimeString()
            }
        },
        {
            title: 'End Time',
            dataIndex: 'end_time',
            key: 'end_time',
            render: (text) => {
                return new Date(text).toLocaleTimeString()
            }
        },
        {
            title: 'Available',
            key: 'slot_limit',
            dataIndex: 'slot_limit',
            render: (_, { available }) => (
                <>
                    <Tag color={available > 4 ? 'green' : available === 0 ? 'red' : 'orange'} key={available}>
                        {available}
                    </Tag>

                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button disabled={record.available === 0} onClick={() => {
                        handleProceedClick(record._id, props.availableSlot?.calender_id || "")
                        // router.push(`?calender_id=${props.availableSlot?.calender_id}&slot_id=${record._id}`)
                    }} type='primary'> Procced</Button>
                </Space>
            ),
        },
    ];

    return (
        props.availableSlot ?
            <div>
                <Text strong>Date : {new Date(props.availableSlot.date).toDateString()}</Text>
                <Table pagination={false} className='mt-4' columns={columns} dataSource={talbeRows} />
            </div> : ""
    )
}

export default ShowSlotAvailableData