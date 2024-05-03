"use client";

import { getAllAppointment } from '@/app/services/operations/appointment/appointment';
import { TworkOrderCreate } from '@/app/validators/workorder';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

type Props = {
    appointmentId?: string;
    setWorkOrderCreateData: React.Dispatch<React.SetStateAction<TworkOrderCreate>>;
};

type Options = {
    value: string;
    label: string;
};

const CreateWorkOrderByDate: React.FC<Props> = (props) => {
    const [appointmentData, setAppointmentData] = useState<Options[]>([]);

    useEffect(() => {
        getAllAppointmentDataByDate();
    }, []);

    const getAllAppointmentDataByDate = async () => {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if month is less than 10
        const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if day is less than 10

        const formattedDate = `${year}-${month}-${day}`;

        console.log(formattedDate);

        const result = await getAllAppointment(`date=${formattedDate}&populate=true`);

        if (result?.length > 0) {
            const updatedData: Options[] = result.map(element => ({ value: element._id, label: typeof(element.vehicle_id) === 'string' ? '' : element.vehicle_id.registeration_number }));

            setAppointmentData(updatedData);
        }
    };

    const onChange = (value: string) => {
        props.setWorkOrderCreateData((prv) => {
            return {
                ...prv,
                appointmentId: value
            };
        });
    };


    // Filter `option.label` match the user type `input`
    const filterOption = (input: string, option?: { label: string; value: string; }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div>
            <Select
                showSearch
                placeholder="Select appointment"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={filterOption}
                options={appointmentData}
            />
        </div>
    );
};

export default CreateWorkOrderByDate;
