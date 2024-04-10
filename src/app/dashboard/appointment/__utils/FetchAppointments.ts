'use client'
import { ICustomerAppointmentData } from '@/app/store/slices/customerAppointmentSlice';
import { convertToLocaleDateAndWeekday, extractTimeFromDate, formatDateAndTime } from '@/app/utils/dateFormatter';

export interface AppointmentData {
    appointmentId: string;
    appointmentDate: string;
    slotTimings: {
        startTime: string;
        endTime: string;
    } | null;
    appointmentCreated: string;
    vehicleVIN: string;
    vehicleReg: string;
    status: string
}

export const sortDataByCreatedAt = (data: ICustomerAppointmentData[]): ICustomerAppointmentData[] => {
    // console.log(data)
    data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const newData = data
    return newData
};

export const fetchAppointments = (data: ICustomerAppointmentData[], status?: string): AppointmentData[] => {
    // console.log(data,status)
    let filteredAppointments = data
    // let filteredAppointments = sortDataByCreatedAt(data);
    
    if (status) {
        filteredAppointments = data.filter(appointment => appointment.status === status);
    }

    return filteredAppointments.map(appointment => {
        const { _id: appointmentId, createdAt: appointmentCreated, vehicle_id: { vin: vehicleVIN, registeration_number: vehicleReg }, calender_id: { date: appointmentDate, slots }, status: status } = appointment;
        const slot = slots.find(slot => slot._id === appointment.slot_id);
        const slotTimings = slot ? { startTime: extractTimeFromDate(slot.start_time), endTime: extractTimeFromDate(slot.end_time) } : null;
        return {
            appointmentId,
            appointmentDate: convertToLocaleDateAndWeekday(appointmentDate),
            slotTimings,
            appointmentCreated: formatDateAndTime(appointmentCreated),
            vehicleVIN,
            vehicleReg,
            status
        } as AppointmentData;
    });
};

