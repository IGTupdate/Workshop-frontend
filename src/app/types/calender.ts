export type TSlot = {
  start_time: Date;
  end_time: Date;
  slot_limit: Date;
  _id: string;
};

export type TCalender = {
  _id: string;
  date: string;
  status: string;
  slots: TSlot[];
};
