// 'use client'
// import Watermark from '@/app/components/Text/WatermarkText';
// import { cancelAppointment, getAllCustomerAppointment } from '@/app/services/operations/appointment/appointment';
// import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
// import React, { useEffect, useState } from 'react';
// import AllAppointments from '../__common/AllAppointment';
// import { AppointmentData, fetchAppointments } from '../__utils/FetchAppointments';
// import { useRouter } from 'next/navigation';

// const Page: React.FC = () => {
//     const [scheduledAppointmentData, setScheduledAppointmentData] = useState<AppointmentData[]>([]);
//     const { appointmentLoading, appointmentData } = useAppSelector((state) => state.customerAppointment)
//     const dispatch = useAppDispatch()
//     const router = useRouter()

//     useEffect(() => {
//         if(appointmentLoading){
//             dispatch(getAllCustomerAppointment())
//         }
//     }, []);

//     useEffect(() => {
//         const allAppointmentsData : AppointmentData[] = fetchAppointments(appointmentData, 'Scheduled')
//         setScheduledAppointmentData(allAppointmentsData)
//     }, [appointmentData]);
    
//     const handleRescheduleAppointment = (appointmentId: string) => {
//         router.push('reschedule/'+appointmentId)
//     };

//     const handleCancelAppointment = async (appointmentId: string) => {
//         await cancelAppointment(appointmentId, dispatch)
//     };

//     return (
//         <>
//         {
//             appointmentLoading ? (<h1>LOADING</h1>) : (
//                 <div>
//                     <h1 className='text-lg font-bold bg-white p-4'>Re-Schedule Appointment</h1>
//                     <div className=' flex flex-col gap-4 my-4'>
//                         {scheduledAppointmentData.length > 0 ? (
//                             scheduledAppointmentData.map(appointment => (
//                                 <AllAppointments
//                                     key={appointment.appointmentId}
//                                     appointment={appointment}
//                                     onRescheduleAppointment={handleRescheduleAppointment}
//                                     onCancelAppointment={handleCancelAppointment}
//                                 />
//                             ))
//                         ) : (
//                             <div><Watermark text='No Previous appointments found'/></div>
//                         )}
//                     </div>
//                 </div>
//             )
//         }
//         </>
//     );
// };

// export default Page;

import React from 'react'
import CustomShowAllAppointments from '../../__components/__common/CustomShowAllAppointments'

type Props = {}

const page = (props: Props) => {
  return (
    <CustomShowAllAppointments pageType='reschedule'/>
  )
}

export default page

