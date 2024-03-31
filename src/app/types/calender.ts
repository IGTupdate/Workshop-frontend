export type TSlot = {
  start_time: string; // iso string
  end_time: string;
  slot_limit: number;
  _id: string;
};

export type TCalender = {
  _id: string;
  date: string;
  status: "Open" | "Close" | "Default";
  slots: TSlot[];
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
};
