'use client';
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
}

const AppointmentPage: React.FC<Props> = ({ params }) => {
  const [appointmentData, setAppointmentData] = useState<TAppointment | null>(null);
  const router = useRouter();

  const fetchAppointmentData = async () => {
    try {
      const result = await getAppointmentByAppointmentId(params.appointmentId);
      setAppointmentData(result);
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    if (!appointmentData) fetchAppointmentData();
  }, [params.appointmentId]);

  return (
    <div className='p-4 pt-28 pb-32 md:p-0'>
      <Button onClick={() => router.back()} className='mb-4 w-fit'>Back</Button>
      {appointmentData ? (
        <>
          <Typography.Title level={2}>Appointment Details</Typography.Title>
          <AppointmentDetails appointmentData={appointmentData} bordered />
        </>

      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default AppointmentPage;
