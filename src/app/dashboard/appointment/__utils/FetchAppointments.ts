'use client'
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
}

export const fetchAppointments = (data : any) => {
    return data.map(appointment => {
        const { _id: appointmentId, createdAt: appointmentCreated, vehicle_id: { vin: vehicleVIN, registeration_number: vehicleReg }, calender_id: { date: appointmentDate, slots } } = appointment;
        const slot = slots.find(slot => slot._id === appointment.slot_id);
        const slotTimings = slot ? { startTime: extractTimeFromDate(slot.start_time), endTime: extractTimeFromDate(slot.end_time) } : null;
        return {
            appointmentId,
            appointmentDate: convertToLocaleDateAndWeekday(appointmentDate),
            slotTimings,
            appointmentCreated: formatDateAndTime(appointmentCreated),
            vehicleVIN,
            vehicleReg
        } as AppointmentData;
    });
};
