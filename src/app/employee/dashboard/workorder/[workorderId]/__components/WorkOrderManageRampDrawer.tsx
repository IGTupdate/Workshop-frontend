"use client";

import { assignRampInWorkOrder, getAllRampDetails } from '@/app/services/operations/workorder/workorder';
import { TRamp } from '@/app/types/ramp';
import { TWorkOrder } from '@/app/types/work-order';
import { COMMON_ERROR } from '@/app/utils/constants/constant';
import { Button, Drawer, Radio, RadioChangeEvent, Space, Typography } from 'antd';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const { Title } = Typography;

type Props = {
    ramp: string | TRamp | null;
    handleUpdateWorkOrderData: (field: keyof TWorkOrder, fieldData: any) => void;
};

const WorkOrderManageRampDrawer = (props: Props) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedRamp, setSelectedRamp] = useState<string>("");
    const [allRamps, setAllRamps] = useState<TRamp[]>([]);

    const params = useParams();

    const handleopenDrawer = () => {
        setOpenDrawer(true);
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    };


    useEffect(() => {
        (async function () {
            try {
                const response = await getAllRampDetails();
                setAllRamps(response);

            } catch (err) {
                console.log(err);
            }
        }());
    }, []);

    useEffect(() => {
        setSelectedRamp(() => {
            return (typeof props.ramp === "string") ? props.ramp : props.ramp?._id || "";
        });
    }, [props.ramp, openDrawer]);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setSelectedRamp(e.target.value);
    };

    const handleSave = async () => {
        // if (!selectedRamp) {
        //     toast.error("No Ramp Selected");
        //     return;
        // }
        if ((typeof props.ramp === "string") ? selectedRamp === props.ramp : selectedRamp === props.ramp?._id) {
            toast.error("This Ramp is already assigned for this work order");
            return;
        }

        try {
            const data = {
                rampId: selectedRamp
            };
            const response = await assignRampInWorkOrder(params.workorderId as string, data);
            toast.success("Requsted Completed SuccesssFully");

            const updatedRampData = allRamps.find((el) => {
                return el._id === data.rampId;
            });

            props.handleUpdateWorkOrderData("rampId", updatedRampData);

        } catch (err: any) {
            console.log(err);
            toast.error(err?.respone?.data?.message || COMMON_ERROR);
        }
    };


    return (
        <div>
            <Button onClick={handleopenDrawer} type='primary' >Manage Ramp</Button>

            <Drawer title="Ramp Status"
                width={520}
                onClose={handleCloseDrawer}
                open={openDrawer}
                extra={
                    < Space >
                        <Button onClick={handleCloseDrawer}>Cancel</Button>
                        <Button type="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </Space>
                }
            >
                <div>
                    <Title level={5}>Assign Ramp</Title>


                    <Radio.Group
                        onChange={onChange}
                        value={selectedRamp || ""}
                    >
                        <Space direction="vertical">
                            {/* <Radio value={""}>Reset</Radio> */}
                            <div className="flex flex-wrap gap-4 justify-between items-center">
                                {
                                    allRamps.map((el, index) => {
                                        return <Radio key={index} value={el._id}>{el.name}</Radio>;
                                    })
                                }
                            </div>
                        </Space>
                    </Radio.Group>

                </div>
            </Drawer >
        </div >
    );
};

export default WorkOrderManageRampDrawer;