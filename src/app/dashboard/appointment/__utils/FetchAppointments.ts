'use client'
import { ICustomerAppointmentData } from '@/app/store/slices/customerAppointmentSlice';
import { TVehicle } from '@/app/types/vehicle';
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

export const fetchAppointments = (data: ICustomerAppointmentData[], status?: string): AppointmentData[] => {
    // console.log(data,status)
    let filteredAppointments = data;
    
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

const findAllVehicles = (appointments: ICustomerAppointmentData[]): TVehicle[] => {
    const vehiclesMap = new Map<string, TVehicle>();

    // Iterate over each appointment
    appointments.forEach(appointment => {
        const { vehicle_id } = appointment;
        const { _id, vehicle_make, vehicle_model, vin, registeration_number, owner, createdAt, updatedAt } = vehicle_id;

        // Check if the vehicle is not already included
        if (!vehiclesMap.has(registeration_number)) {
            // Add the vehicle to the map
            vehiclesMap.set(registeration_number, {
                _id,
                vehicle_make,
                vehicle_model,
                vin,
                registeration_number,
                owner,
                createdAt : formatDateAndTime(createdAt),
                updatedAt
            });
        }
    });

    // Convert the map values to an array and return
    return Array.from(vehiclesMap.values());
};
