"use client";

import { TEmployee } from '@/app/types/employee';
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Col, GetProp, Row } from 'antd';
import { getAllEmployees } from '@/app/services/operations/auth/employeeAuth';
import { employeeRole } from '@/app/utils/constants/employee-roles';
import toast from 'react-hot-toast';
import { COMMON_ERROR } from '@/app/utils/constants/constant';
import { removeMechanicWorkOrder } from '@/app/services/operations/workorder/workorder';
import { useParams } from 'next/navigation';
import Loader from '@/app/components/Loader';
import { TWorkOrder } from '@/app/types/work-order';


type Props = {
    assigned_mechanics: string[] | TEmployee[],
    handleUpdateWorkOrderData: (field: keyof TWorkOrder, fieldData: any) => void,
}

const RemoveMechanicDrawerContainer = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const [selectedMechanics, setSelectedMechanics] = useState<TEmployee[]>([]);

    const [mechanics, setMechanics] = useState<TEmployee[]>([])

    // parasm hook
    const params = useParams();

    useEffect(() => {
        if (props.assigned_mechanics.length > 0 && typeof props.assigned_mechanics[0] === "string") {
            (async function () {
                setLoading(true);
                try {
                    const response_mechanics = await getAllEmployees(employeeRole.mechanic) as TEmployee[];
                    // console.log(response_mechanics);
                    setMechanics(() => {
                        return response_mechanics.filter((el) => {
                            return props.assigned_mechanics.includes(el._id as any);
                        })
                    })
                } catch (err) {
                    console.log(err);
                }
                finally {
                    setLoading(false);
                }
            }())
        }
        else {
            setMechanics(props.assigned_mechanics as TEmployee[])
        }


    }, [props.assigned_mechanics])

    useEffect(() => {
        console.log("mechanis", mechanics, props.assigned_mechanics);
    }, [mechanics])

    const handleSelectMechanic: GetProp<typeof Checkbox.Group, 'onChange'> = (mechanic) => {
        const alreadySelected = selectedMechanics.find((el) => {
            return el._id === String(mechanic);
        })
        if (alreadySelected) {
            setSelectedMechanics((prv) => {
                return prv.filter((el) => {
                    return el._id !== String(mechanic)
                })
            })
        }
        else {
            const current_selected = mechanics.find(el => el._id === String(mechanic))
            if (current_selected) {
                setSelectedMechanics((prv) => {
                    return [
                        ...prv,
                        current_selected
                    ]
                })
            }
        }
    }

    const handleRemoveOrderMechanic = async () => {
        if (selectedMechanics.length === 0) return;

        try {
            setLoading(true);

            // extract id of the mechanics
            const removed_mechanics_id = selectedMechanics.map((el) => {
                return el._id
            })
            const workOrderId = params.workorderId as string;
            const response = await removeMechanicWorkOrder(workOrderId, { mechanics: removed_mechanics_id });
            toast.success(response.message || "")

            // updating on the current order so the changes reflect on the other ui parts as well
            const updatedMechanics = props.assigned_mechanics.filter((el) => {
                const required_selected_mechanics = selectedMechanics.find((selected) => {
                    return (typeof el === "string") ? el === selected._id : el._id === selected._id
                })
                return !required_selected_mechanics
            })
            props.handleUpdateWorkOrderData('mechanicId', updatedMechanics);

            // flush the selected ones as the operation is over
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
        <>
            {
                loading ? <Loader /> : <div>
                    <Checkbox.Group style={{ width: '100%' }} onChange={handleSelectMechanic}>
                        {
                            mechanics.map((el, index) => {
                                return <div key={index} className='w-full'>
                                    <Checkbox value={el._id}>{el.fullName}</Checkbox>
                                </div>
                            })
                        }
                    </Checkbox.Group>
                    <div className='mt-4 flex justify-end'>
                        <Button onClick={handleRemoveOrderMechanic} type="primary">Remove</Button>
                    </div>
                </div>
            }
        </>
    )
}

export default RemoveMechanicDrawerContainer