import { TSlot } from "./calender";

export type TASlot = {
  start_time: string; // iso string
  end_time: string;
  available: number;
  _id: string;
}

export type TAvailbleSlots = {
  date: string;
  calender_id: string;
  status: string;
  available_slots: TASlot[];
}

