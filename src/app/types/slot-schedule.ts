export type TSlotTime = {
  hour: number;
  minute: number;
  second?: number;
};

export type TSlotDetail = {
  start_time: TSlotTime;
  end_time: TSlotTime;
  slot_limit: number;
};

export type TSlotSchedule = {
  name: string;
  slot_details: TSlotDetail[];
};
