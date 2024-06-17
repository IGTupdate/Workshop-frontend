"use client";
import { ICustomerAppointmentData } from "@/app/store/slices/customerAppointmentSlice";
import {
  convertToLocaleDateAndWeekday,
  extractTimeFromDate,
  formatDateAndTime,
} from "@/app/utils/dateFormatter";

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
  status: string;
}

export const fetchAppointments = (
  data: ICustomerAppointmentData[],
  status?: string[],
): AppointmentData[] => {
  // Make a copy of the data array
  let filteredAppointments = [...data];

  // Sort the appointments based on their creation date
  filteredAppointments.sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt).getTime();
    const dateB = new Date(b.updatedAt || b.createdAt).getTime();
    return dateB - dateA;
  });

  // Filter appointments by status if provided
  if (status) {
    filteredAppointments = filteredAppointments.filter((appointment) =>
      status.includes(appointment.status),
    );
  }

  // Map each appointment to an AppointmentData object
  return filteredAppointments.map((appointment) => {
    const {
      _id: appointmentId,
      createdAt: appointmentCreated,
      vehicle_id: { vin: vehicleVIN, registeration_number: vehicleReg },
      calender_id: { date: appointmentDate, slots },
      status: status,
    } = appointment;
    const slot = slots.find((slot) => slot._id === appointment.slot_id);
    const slotTimings = slot
      ? {
          startTime: extractTimeFromDate(slot.start_time),
          endTime: extractTimeFromDate(slot.end_time),
        }
      : null;
    return {
      appointmentId,
      appointmentDate: convertToLocaleDateAndWeekday(appointmentDate),
      slotTimings,
      appointmentCreated: formatDateAndTime(appointmentCreated),
      vehicleVIN,
      vehicleReg,
      status,
    } as AppointmentData;
  });
};
