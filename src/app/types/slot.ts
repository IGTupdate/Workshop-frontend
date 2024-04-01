export interface AvailableSlot {
    _id: string;
    start_time: string;
    end_time: string;
    available: number;
  }
  
export interface SlotData {
    date: string;
    calendar_id: string;
    status: string;
    available_slots: AvailableSlot[];
  }
  
  