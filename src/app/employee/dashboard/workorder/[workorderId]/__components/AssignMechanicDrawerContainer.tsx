"use client";

import DescriptionItem from '@/app/components/DescriptionItem.tsx';
import { assignMechanicWorkorder, getEmployeeWorkingStatus } from '@/app/services/operations/workorder/workorder';
import { TEmployee, TEmployeeWorkStatus } from '@/app/types/employee';
import { TWorkOrder } from '@/app/types/work-order';
import { COMMON_ERROR } from '@/app/utils/constants/constant';
import { employeeRole } from '@/app/utils/constants/employee-roles';
import { Button, Divider, Drawer, Space, Typography } from 'antd';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdOutlineCancelPresentation } from "react-icons/md";


const { Title, Text } = Typography;


type Props = {
    assigned_mechanics: string[] | TEmployee[],
    handleUpdateWorkOrderData: (field: keyof TWorkOrder, fieldData: any) => void,
}

const AssignMechanicDrawerContainer = (props: Props) => {

    const [loading, setLoading] = useState(true);
    const [openChildDrawer, setOpenChildDrawer] = useState<TEmployeeWorkStatus | null>(null);
    const [selectedMechanics, setSelectedMechanics] = useState<TEmployeeWorkStatus[]>([]);
    const [mechanicsStatus, setMechanicsStatus] = useState<TEmployeeWorkStatus[]>([])
    const params = useParams();

    // useEffect(() => {

    // }, [props.assigned_mechanics]);


    // child
    const handleChildDrawerOnClose = () => {
        setOpenChildDrawer(null);
    }
    const handleChildopenDrawer = (data: TEmployeeWorkStatus) => {
        setOpenChildDrawer(data);
    }


    useEffect(() => {
        (async function () {
            try {
                const response = await getEmployeeWorkingStatus(employeeRole.mechanic) as TEmployeeWorkStatus[];
                setMechanicsStatus(response);
            } catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }())
    }, [props.assigned_mechanics]);

    const checkIfAlreadyAssigned = (mechanic: string) => {
        return props.assigned_mechanics.find((el) => {
            return (typeof el === "string") ? el === mechanic : el._id === mechanic
        })
    }

    const checkIfSelected = (mechnic: string) => {
        return selectedMechanics.find((el) => {
            return el._id === mechnic
        })
    }

    const handleMechanicSelectClick = (mechnic: TEmployeeWorkStatus) => {
        if (checkIfSelected(mechnic._id)) {
            setSelectedMechanics((prv) => {
                return prv.filter((el) => {
                    return el._id !== mechnic._id
                })
            })
        }
        else {
            setSelectedMechanics((prv) => {
                return [
                    ...prv,
                    mechnic
                ]
            })
        }
    }

    const handleAssignMechanicToWorkorder = async () => {
        if (selectedMechanics.length === 0) return;
        try {
            setLoading(true);
            // extract the ids of the mechanics
            const assign_mechanic_id = selectedMechanics.map((el) => {
                return el._id
            })
            const workOrderId = params.workorderId as string;
            const response = await assignMechanicWorkorder(workOrderId, { mechanics: assign_mechanic_id });
            // console.log(response);
            toast.success(response.message || "")

            // update the changes in the work order 
            const current_assigned_mechanics = selectedMechanics.map((selected) => {
                if (props.assigned_mechanics.length > 0 && typeof props.assigned_mechanics[0] === "string") {
                    return selected._id as string
                }
                else {
                    return {
                        _id: selected._id,
                        fullName: selected.fullName,
                        email: selected.email,
                        roleId: selected.roleId,
                        userType: "employee"
                    } as TEmployee
                }
            });
            props.handleUpdateWorkOrderData("mechanicId", [...props.assigned_mechanics, ...current_assigned_mechanics]);
            // flush the current selected mechanics
            setSelectedMechanics([])

        } catch (err: any) {
            console.log(err);
            toast.error(err?.response?.data?.message || COMMON_ERROR)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div>
                <ul>
                    {
                        mechanicsStatus.map((mechanic, index) => {
                            return <li key={index}>
                                <div className='grid grid-cols-2 gap-4'>
                                    <DescriptionItem title={"Name"} content={mechanic.fullName} />
                                    <DescriptionItem title='Assigned WorkOrder' content={mechanic.assigned_workOrder.length} />
                                    <div className='flex gap-4'>
                                        <Button className='bg-neutral-800 text-white1' onClick={() => {
                                            handleChildopenDrawer(mechanic);
                                        }}>View Work Orders</Button>
                                        <Button
                                            disabled={checkIfAlreadyAssigned(mechanic._id) ? true : false}
                                            onClick={() => {
                                                handleMechanicSelectClick(mechanic);
                                            }}
                                            type={`${checkIfSelected(mechanic._id) ? "primary" : "default"}`}>
                                            Select
                                        </Button>
                                    </div>
                                </div>
                                <Divider />
                            </li>
                        })
                    }
                </ul>

                {/* selected mechanics */}
                <div className='mb-4'>
                    <Title level={5}>Selected Mechanic</Title>
                    <ul className='grid grid-cols-3 gap-4'>
                        {
                            selectedMechanics.length > 0 ? selectedMechanics.map((el,) => {
                                return <li key={el._id} className='flex gap-4 items-center '>
                                    {el.fullName}
                                    <button type='button' title='remove' onClick={() => {
                                        handleMechanicSelectClick(el);
                                    }}>
                                        <MdOutlineCancelPresentation />
                                    </button>
                                </li>
                            }) : "No Assigned Mechanic"
                        }
                    </ul>

                    <div className='mt-4 flex justify-end'>
                        <Button
                            disabled={loading}
                            onClick={handleAssignMechanicToWorkorder}
                            type='primary'>
                            Assign
                        </Button>
                    </div>
                </div>
            </div>
            <Drawer
                title="Mechanic Status Details"
                width={320}
                closable={false}
                onClose={handleChildDrawerOnClose}
                open={openChildDrawer !== null}
            >
                {
                    openChildDrawer ? <div>
                        <div className='grid gap-4 grid-cols-2'>
                            <DescriptionItem title={"Name"} content={openChildDrawer.fullName} />
                            <DescriptionItem title='Assigned WorkOrder' content={openChildDrawer.assigned_workOrder.length} />
                        </div>

                        <div className='my-4'>
                            <Title level={5}>Work Order Details</Title>
                            <ul>
                                {
                                    openChildDrawer.assigned_workOrder.length > 0 ? openChildDrawer.assigned_workOrder.map((el, index) => {
                                        return <li key={index} className='grid grid-cols-2 gap-3 border-b py-2'>
                                            <DescriptionItem title={"Order Number"} content={el.orderNumber} />
                                            <DescriptionItem title={"RampId"} content={
                                                (typeof el.ramdId !== "string") ? el.ramdId?.name : "-"
                                            } />
                                            <DescriptionItem title={"Estimated Time of Completion"} content={"ORD-1234556789"} />
                                        </li>
                                    }) : <Text>No Work Order Assigned</Text>
                                }
                            </ul>
                        </div>
                    </div> : "Not Found"
                }

            </Drawer>

        </div>
    )
}

export default AssignMechanicDrawerContainer