import { TSlotSchedule } from "@/app/types/slot-schedule";

export const demoSlotScheduleData: TSlotSchedule[] = [
  {
    name: "Morning",
    slot_details: [
      {
        start_time: { hour: 8, minute: 0 },
        end_time: { hour: 10, minute: 0 },
        slot_limit: 5,
      },
      {
        start_time: { hour: 10, minute: 0 },
        end_time: { hour: 12, minute: 0 },
        slot_limit: 5,
      },
    ],
  },
  {
    name: "Afternoon",
    slot_details: [
      {
        start_time: { hour: 12, minute: 0 },
        end_time: { hour: 14, minute: 0 },
        slot_limit: 5,
      },
      {
        start_time: { hour: 14, minute: 0 },
        end_time: { hour: 16, minute: 0 },
        slot_limit: 5,
      },
    ],
  },
  {
    name: "Evening",
    slot_details: [
      {
        start_time: { hour: 16, minute: 0 },
        end_time: { hour: 18, minute: 0 },
        slot_limit: 5,
      },
      {
        start_time: { hour: 18, minute: 0 },
        end_time: { hour: 20, minute: 0 },
        slot_limit: 5,
      },
    ],
  },
  {
    name: "Night",
    slot_details: [
      {
        start_time: { hour: 20, minute: 0 },
        end_time: { hour: 22, minute: 0 },
        slot_limit: 5,
      },
      {
        start_time: { hour: 22, minute: 0 },
        end_time: { hour: 0, minute: 0 },
        slot_limit: 5,
      },
    ],
  },
  // Add more slot schedules as needed
];

