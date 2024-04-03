export type TSlot = {
  start_time: string; // iso string
  end_time: string;
  slot_limit: number;
  _id: string;
};

export type TCalenderStatus = "Open" | "Close" | "Default"
export type TCalender = {
  _id: string;
  date: string;
  status: TCalenderStatus;
  slots: TSlot[];
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
};

