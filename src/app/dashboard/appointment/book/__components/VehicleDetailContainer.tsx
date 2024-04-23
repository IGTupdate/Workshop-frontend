"use client"
import VehicleCreateContainer from '@/app/employee/dashboard/appointment/book/__components/VehicleCreateContainer'
import { NEW_VEHICLE } from '@/app/employee/dashboard/appointment/book/__utils/constant'
import { deleteVehicle, getVehicleByCustomerId } from '@/app/services/operations/appointment/vehicle'
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks'
import { setVehicleLoading } from '@/app/store/slices/customerVehicleSlice'
import { TAppointmentBook } from '@/app/types/appointment'
import { Button, Typography } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import VehicleDetails from './VehicleDetails'
import VehicleUpdateContainer from './VehicleUpdateContainer'

const { Title } = Typography

type Props = {
    setAppointmentBookingData: React.Dispatch<React.SetStateAction<TAppointmentBook>>
}

const VehicleDetailContainer = (props: Props) => {

    const [vehicleId, setVehicleId] = useState("");
    const [updateVehicleId, setUpdateVehicleId] = useState("");
    const router = useRouter();
    const pathname = usePathname()
    const { vehicleLoading, vehicleData } = useAppSelector((state) => state.customerVehicle)
    const customerId = useAppSelector((state) => state.auth.authData._id)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (vehicleLoading) {
            dispatch(getVehicleByCustomerId())
        }
    }, [vehicleLoading]);

    useEffect(() => {
        if (vehicleId !== NEW_VEHICLE.value) {
            props.setAppointmentBookingData((prv) => {
                return {
                    ...prv,
                    vehicle_id: vehicleId
                }
            });
        }
    }, [vehicleId])

    const handleAddNewVehicle = () => {
        setVehicleId(NEW_VEHICLE.value)
    }

    const handleBack = () => {
        router.push(pathname)
    }

    useEffect(() => {
        setUpdateVehicleId('')
    }, [vehicleId])

    useEffect(() => {
        setVehicleId('')
    }, [updateVehicleId])

    const onDeleteVehicle = async (_id: string) => {
        try {
            await deleteVehicle(_id, customerId)
        } catch (err: any) {
            // console.log(err);
        }
        finally {
            dispatch(setVehicleLoading(true))
        }
    }

    return (
        <>
            {
                vehicleLoading ? <div>Loading</div> : (
                    <div>
                        <div className='mb-5'>
                            <Title level={5}>Fill Vehicle Details</Title>
                        </div>

                        {
                            vehicleId === NEW_VEHICLE.value ?
                                <VehicleCreateContainer setVehicleId={setVehicleId} customer_id={customerId} customer={true} /> : (
                                    <>
                                        {
                                            updateVehicleId ? (<VehicleUpdateContainer
                                                updateVehicleId={updateVehicleId}
                                                setUpdateVehicleId={setUpdateVehicleId}
                                                updateVehicleValues={(vehicleData.find(vehicle => vehicle._id === updateVehicleId)) || {
                                                    registeration_number: "",
                                                    vin: "",
                                                }} />) : (
                                                <div className=' flex flex-col gap-8'>
                                                    {
                                                        vehicleData.map(ele => (
                                                            <VehicleDetails vehicleDetails={ele} key={ele._id} setVehicleId={setVehicleId} setUpdateVehicleId={setUpdateVehicleId} onDeleteVehicle={onDeleteVehicle} />
                                                        ))
                                                    }
                                                    <div className=' flex gap-4'>
                                                        <Button onClick={() => handleAddNewVehicle()} className=' bg-customGray w-fit text-white'>Add New Vehicle</Button>
                                                        <Button onClick={() => handleBack()} >Back</Button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                        }
                    </div>
                )
            }
        </>
    )
}

export default VehicleDetailContainer