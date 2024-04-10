'use client'
import { getAppointmentByAppointmentId } from '@/app/services/operations/appointment/appointment';
import { useEffect, useState } from 'react';
import { AppointmentData } from '../__utils/FetchAppointments';
import AppointmentDetails from '../../../components/Appointment/AppointmentDetails';

interface Props {
  params: {
    appointmentId: string;
  };
}

const AppointmentPage: React.FC<Props> = ({ params }) => {
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);

  const fetchAppointmentData = async () => {
    try {
      const result = await getAppointmentByAppointmentId(params.appointmentId);
      setAppointmentData(result);
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchAppointmentData();
  }, [params.appointmentId]);

  return (
    <>
      {appointmentData ? (
        <AppointmentDetails appointmentData={appointmentData} />
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default AppointmentPage;
