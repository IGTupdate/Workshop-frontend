import { TSlot } from "./calender";

export interface TAvailbleSlots {
  date: string;
  calender_id: string;
  status: string;
  available_slots: TSlot[];
}

