'use client'
import { getAppointmentByAppointmentId } from '@/app/services/operations/appointment/appointment';
import { TAppointment } from '@/app/types/appointment';
import { useEffect, useState } from 'react';
import AppointmentDetails from '../../../components/Appointment/AppointmentDetails';
import { useRouter } from 'next/navigation';
import { Button, Typography } from 'antd';

interface Props {
  params: {
    appointmentId: string;
  };
  appointmentDataPrefetched?: TAppointment | null
}

const AppointmentPage: React.FC<Props> = ({ params, appointmentDataPrefetched }) => {
  const [appointmentData, setAppointmentData] = useState<TAppointment | null>(appointmentDataPrefetched ? appointmentDataPrefetched : null);
  const router = useRouter()

  const fetchAppointmentData = async () => {
    try {
      const result = await getAppointmentByAppointmentId(params.appointmentId);
      setAppointmentData(result);
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    if(!appointmentData) fetchAppointmentData();
  }, [params.appointmentId]);

  return (
    <div>
      <Button onClick={() => router.back()} className='mb-4 w-fit'>Back</Button>
      {appointmentData ? (
        <>
          <Typography.Title level={2}>Appointment Details</Typography.Title>
          <AppointmentDetails appointmentData={appointmentData} bordered/>
        </>
        
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default AppointmentPage;
