"use client"
import { useAppDispatch } from '@/app/store/reduxHooks';
import { setSlotData } from '@/app/store/slices/slotSlice';
import { TAvailbleSlots } from '@/app/types/slot';
import React, { useRef } from 'react';

const data: TAvailbleSlots = {
  date: "2024-03-29T00:00:00.000Z",
  calender_id: "65d3564570fb6acd621ad4c9",
  status: "Open",
  available_slots: [
    {
      _id: "65d3564570fb6acd621ad4ca",
      start_time: "2024-02-16T09:00:00.000Z",
      end_time: "2024-02-16T10:00:00.000Z",
      available: 5
    },
    {
      _id: "65d3564570fb6acd621ad4cb",
      start_time: "2024-02-16T10:00:00.000Z",
      end_time: "2024-02-16T11:00:00.000Z",
      available: 5
    },
    {
      _id: "65d3564570fb6acd621ad4cc",
      start_time: "2024-02-16T11:00:00.000Z",
      end_time: "2024-02-16T12:00:00.000Z",
      available: 3
    },
    {
      _id: "65d3564570fb6acd621ad4cd",
      start_time: "2024-02-16T12:00:00.000Z",
      end_time: "2024-02-16T13:00:00.000Z",
      available: 8
    },
    {
      _id: "65d3564570fb6acd621ad4ce",
      start_time: "2024-02-16T13:00:00.000Z",
      end_time: "2024-02-16T14:00:00.000Z",
      available: 0
    },
    {
      _id: "65d3564570fb6acd621ad4cf",
      start_time: "2024-02-16T14:00:00.000Z",
      end_time: "2024-02-16T15:00:00.000Z",
      available: 10
    }
  ]
}

interface Props {
  selectedDate: string;
  scrollToSlotDetails: () => void;
}

const ShowSlots: React.FC<Props> = ({ selectedDate, scrollToSlotDetails }) => {
  const dispatch = useAppDispatch();
  const scrollToSlotDetailsRef = useRef(scrollToSlotDetails);

  const handleClick = async () => {
    try {
      if (selectedDate !== '') {
        dispatch(setSlotData(data));
        scrollToSlotDetailsRef.current?.();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className='bg-customGray hover:bg-opacity-90 transition-all duration-200 h-full w-[40%] text-lg font-semibold text-red-400 hover:text-red-300 rounded-r-full'
    >
      Find Available Slots
    </button>
  );
};

export default ShowSlots;