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
  const [selectedDate, setSelectedDateState] = useState(dayjs());

  useEffect(() => {
    handleDateChange(selectedDate); 
  }, );

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    const formattedDate = date ? date.format(dateFormat) : '';
    setSelectedDate(formattedDate);
    setSelectedDateState(date || dayjs()); 
  };

  return (
    <DatePicker
      value={selectedDate}
      format={dateFormat}
      minDate={dayjs()}
      maxDate={maxDate}
      allowClear={true}
      inputReadOnly={true}
      mode='date'
      superNextIcon={''}
      superPrevIcon={''}
      className='h-full w-[60%] rounded-l-full text-3xl text-black py-6 px-12'
      picker='date'
      onChange={handleDateChange}
    />
  );
};

export default LandingDatePicker;

