"use client";


import { TAppointmentBook } from '@/app/types/appointment'
import { Button, Typography } from 'antd'
import React, { useEffect, useState } from 'react';
import CustomerSendOtp from './CustomerSendOtp';
import CustomerVerifyOtp from './CustomerVerifyOtp';
import { TCustomer } from '@/app/types/customer';
import { setAppointmentData } from '@/app/store/slices/customerAppointmentSlice';
import CustomerInfo from './CustomerInfo';

const { Title } = Typography;

type Props = {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    setAppointmentBookingData: React.Dispatch<React.SetStateAction<TAppointmentBook>>
}

const CustomerDetailContainer = (props: Props) => {
    const [authStep, setAuthStep] = useState(0);
    const [customer, setCustomer] = useState<TCustomer>({
        contactNumber: "",
        email: "",
        name: "",
        _id: ""
    })

    useEffect(() => {
        if (authStep === 3) {
            props.setAppointmentBookingData((prv) => {
                return {
                    ...prv,
                    customer_id: customer._id
                }
            })
        }
    }, [authStep])



    return (
        <div>

            <div className='mb-5'>
                <Title level={5}>Fill Customer Details</Title>
            </div>

            <div className='grid grid-cols-2'>
                {
                    <div className='w-full sm:max-w-[320px]'>
                        {
                            authStep === 0 && <CustomerSendOtp
                                setAuthStep={setAuthStep}
                                setCustomer={setCustomer}
                            />
                        }
                        {
                            authStep === 1 && <CustomerVerifyOtp
                                setAuthStep={setAuthStep}
                                customer={customer}
                                setCustomer={setCustomer}
                            />
                        }
                        {
                            authStep === 2 && <CustomerInfo
                                setAuthStep={setAuthStep}
                                setCustomer={setCustomer}
                                customer = {customer}
                            />
                        }
                    </div>
                }
            </div>


            {/* <Button onClick={() => {
                props.setCurrentStep(2);
            }}>Proceed for now as demo customer</Button> */}
        </div>
    )
}

export default CustomerDetailContainer