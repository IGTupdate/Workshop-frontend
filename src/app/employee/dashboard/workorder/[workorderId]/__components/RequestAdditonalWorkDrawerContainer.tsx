"use client";

import { Button, Drawer, Form, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import RequestAdditionalWorkFormContainer from './RequestAdditionalWorkFormContainer';
import { TworkOrderAdditionalWorkCreateRequest, workOrderAdditionalWorkCreateRequest } from '@/app/validators/workorder';
import { NEW_ADDITIONAL_WORK } from '../__utils/constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { requestAdditionalWork } from '@/app/services/operations/workorder/additional-work';
import toast from 'react-hot-toast';
import { COMMON_ERROR } from '@/app/utils/constants/constant';


type Props = {}

const RequestAdditonalWorkDrawerContainer = (props: Props) => {

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const [loading, setLoading] = useState(false);

    const params = useParams();

    const handleOpenDrawer = () => {
        setOpenDrawer(true);
    }

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    }



    const { control, handleSubmit, formState: { errors }, reset, setValue, getValues }
        = useForm<TworkOrderAdditionalWorkCreateRequest>({
            defaultValues: NEW_ADDITIONAL_WORK,
            resolver: yupResolver(workOrderAdditionalWorkCreateRequest)
        });


    const onSubmit = async (data: TworkOrderAdditionalWorkCreateRequest) => {
        try {
            setLoading(true);
            const response = await requestAdditionalWork(data)
            toast.success(response.message || "")
            handleCloseDrawer();
            reset();

        } catch (err: any) {
            toast.error(err?.response?.data?.message || COMMON_ERROR)
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (openDrawer) {
            setValue("workOrderId", params.workorderId as string)
        }
    }, [params, openDrawer])


    return (
        <div>
            <div>
                <Button type='primary' onClick={handleOpenDrawer} icon={<PlusOutlined />}>Request Additional Work</Button>
            </div>
            <Drawer
                title="Request Additonal Work"
                width={480}
                onClose={handleCloseDrawer}
                open={openDrawer}
                styles={{ body: { paddingBottom: 80, } }}
                extra={
                    <Space>
                        <Button onClick={handleCloseDrawer}>Cancel</Button>
                        <Button disabled={loading} onClick={handleSubmit(onSubmit)} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <RequestAdditionalWorkFormContainer
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                />
            </Drawer>
        </div>
    )
}

export default RequestAdditonalWorkDrawerContainer