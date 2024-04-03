"use client"
import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const dateFormat = 'DD-MM-YYYY';
const maxDate = dayjs().add(7, 'day');

interface LandingDatePickerProps {
  setSelectedDate: (date: string) => void;
}

const LandingDatePicker: React.FC<LandingDatePickerProps> = ({ setSelectedDate }) => {
  const [selectedDate, setSelectedDateState] = useState<dayjs.Dayjs | null>(dayjs()); // Initial value set to current date

  useEffect(() => {
    handleDateChange(selectedDate);
  },);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (!date) {
      // If date is cleared, set selectedDate to null
      setSelectedDateState(null);
      setSelectedDate(''); // Notify parent component of cleared date
    } else {
      const formattedDate = date.format(dateFormat);
      setSelectedDate(formattedDate);
      setSelectedDateState(date);
    }
  };

  return (
    <DatePicker
      value={selectedDate} // Bind value to selectedDate
      format={dateFormat}
      minDate={dayjs()}
      maxDate={maxDate}
      allowClear={true}
      inputReadOnly={true}
      // placement='topLeft'
      // size='small'
      mode='date'
      superNextIcon={''}
      superPrevIcon={''}
      placeholder="Select date" // Placeholder text when value is cleared
      className='h-full w-[60%] rounded-l-full text-3xl text-black py-6 px-12'
      picker='date'
      onChange={handleDateChange}
    />
  );
};

export default LandingDatePicker;
