import { TSlotSchedule } from "@/app/types/slot-schedule";

export const demoSlotScheduleData: TSlotSchedule[] = [
  {
    _id: "65d3564570fb6acd621ad4c9",
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
    _id: "65d3564570fb6acd621ad4c0",
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
    _id: "65d3564570fb6acd621ad4c2",
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
    _id: "65d3564570fb6acd621ad4c3",
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

