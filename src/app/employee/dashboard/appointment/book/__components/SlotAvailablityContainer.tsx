"use client";
import React, { useEffect, useState } from 'react';
import Loader from '@/app/components/Loader';
import Watermark from '@/app/components/Text/WatermarkText';
import { getAvailableSlots } from '@/app/services/operations/appointment/slots';
import { TAvailbleSlots } from '@/app/types/slot';
import { Tabs, Tooltip, Typography } from 'antd';
import { getFormattedDateForSlotAvailabilityFilter } from '../__utils/helper';
import ShowSlotAvailableData from './ShowSlotAvailableData';
const { Text } = Typography;

type Props = {};

const SlotAvailablityContainer = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [availableSlots, setAvailableSlots] = useState<TAvailbleSlots[]>([]);
    const [availableSlotsOptions, setAvailableSlotsOptions] = useState<any>([]);

    useEffect(() => {
        (async function () {
            try {
                const availableSlotsData = await getAvailableSlots() as TAvailbleSlots[];
                setAvailableSlots(availableSlotsData);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (availableSlots.length > 0) {
            prepareSegmentOptions();
            setLoading(false);
        }
    }, [availableSlots]);

    const prepareSegmentOptions = () => {
        if (availableSlots.length === 0) return [];

        const startDate = new Date(availableSlots[0].date);
        const endDate = new Date(availableSlots[availableSlots.length - 1].date);
        let optionArray = [];

        for (let currentDate = startDate, key = 0; currentDate <= endDate; key++, currentDate.setDate(currentDate.getDate() + 1)) {

            const foundCalender = availableSlots.find((day) => {
                return currentDate.toISOString() === day.date;
            });

            if (foundCalender) {
                optionArray.push({
                    key: key,
                    label: getFormattedDateForSlotAvailabilityFilter(new Date(currentDate)),
                    children: <ShowSlotAvailableData availableSlot={foundCalender} />,
                });
            }
            else {
                optionArray.push({
                    key: key,
                    label: <Tooltip title="Closed">{getFormattedDateForSlotAvailabilityFilter(new Date(currentDate))}</Tooltip>,
                    disabled: true,
                });
            }
        }
        setAvailableSlotsOptions(optionArray);
    };

    return (
        loading ? <Loader /> : <div className='w-full '>
            {
                availableSlotsOptions.length > 0 ? <Tabs
                    type='card'
                    defaultActiveKey="0"
                    tabPosition={"top"}
                    items={availableSlotsOptions}
                /> : <Watermark text='No Slots Available' />
            }
        </div>
    );
};

export default SlotAvailablityContainer;