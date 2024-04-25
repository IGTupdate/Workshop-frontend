"use client";

import React, { useEffect, useState } from 'react'
import { Button, Divider, Typography } from 'antd'
import VehicleInspectionImagesContainer from './__components/VehicleInspectionImagesContainer';
import VehicleFuelDetailContainer from './__components/VehicleFuelDetailContainer';
import VehicleObservationContainer from './__components/InventoryOrderContainer';
import { TWorkOrder } from '@/app/types/work-order';
import WorkOrderCustomerDetails from './__components/WorkOrderCustomerDetails';
import WorkOrderObservations from './__components/WorkOrderObservations';
import WorkOrdersPlansWorkContainer from './__components/WorkOrdersPlansWorkContainer';
import { getWorkOrderById } from '@/app/services/operations/workorder/workorder';
import Loader from '@/app/components/Loader';
import AssignMechanicDrawer from './__components/AssignMechanicDrawerContainer';
import InventoryOrderContainer from './__components/InventoryOrderContainer';
import ManageMechanicDrawer from './__components/ManageMechanicDrawer';
import { useRouter } from 'next/navigation';

const { Text } = Typography

type Props = {
    params: {
        workorderId: string
    }
}

const Page = (props: Props) => {

    const [loading, setLoading] = useState(true);
    const [workOrder, setWorkOrder] = useState<TWorkOrder | null>(null);

    const router = useRouter();

    // load work order
    useEffect(() => {
        console.log("hello from work order", props.params.workorderId);
        if (props.params.workorderId) {
            (async function () {
                try {
                    const required_workorder = await getWorkOrderById(props.params.workorderId, true);
                    setWorkOrder(required_workorder);
                } catch (err) {
                    console.log(err);
                } finally {
                    setLoading(false);
                }
            }())
        }
    }, [props.params.workorderId]);

    const handleUpdateWorkOrderData = (field: keyof TWorkOrder, fieldData: any) => {
        setWorkOrder((prv) => {
            return {
                ...prv,
                [field]: fieldData
            } as TWorkOrder
        })
    }


    return (
        <div className='p-4 bg-white rounded-md'>

            {
                loading ? <Loader /> : (
                    workOrder ? <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">WorkOrders - #{workOrder.orderNumber}</h2>
                            <div>
                                <Button className='bg-orange-500 text-white'>Assign Ramp</Button>
                                <Button type='primary' onClick={() => {
                                    router.push(`/employee/dashboard/workorder/${props.params.workorderId}/prepare`)
                                }}>Prepare</Button>
                                <ManageMechanicDrawer
                                    assigned_mechanics={workOrder.mechanicId}
                                    handleUpdateWorkOrderData={handleUpdateWorkOrderData} />
                                {/* <Button className='bg-red-500 text-white'>Assign Ramp</Button> */}

                            </div>
                        </div>

                        <div>
                            <WorkOrderCustomerDetails
                            // customer={workOrder.appointmentId}
                            // vehicle={""}
                            />
                            <Divider />
                            <div className=' mt-4'>
                                <WorkOrdersPlansWorkContainer
                                    servicePlanId={workOrder.servicePlanId || []}
                                    tasks={workOrder.tasks} />
                                <div className='grid grid-cols-2 gap-4'>
                                    <WorkOrderObservations observations={workOrder.observations} />
                                    <VehicleFuelDetailContainer />
                                </div>
                                <InventoryOrderContainer />
                                <VehicleInspectionImagesContainer />
                            </div>
                        </div>
                    </div> : <Text>Work Order not found</Text>
                )
            }

        </div>
    )
}


export default Page