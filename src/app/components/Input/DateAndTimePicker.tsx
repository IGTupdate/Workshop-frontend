import { DatePicker } from "antd";
import moment from "moment";
import React from "react";
import { Controller } from "react-hook-form";

type props = {
  name: string;
  label: string;
  control: any;
  setValue: any;
  disabledDates?: boolean;
};
const DateAndTimePicker = ({
  name,
  label,
  control,
  setValue,
  disabledDates,
}: props) => {
  const handleDateChange = (date: any) => {
    const isoString = date ? date.toISOString() : null;
    setValue(name, isoString);
  };

  const isDateDisabled = (current: any) => {
    // Check against additional disabled dates
    if (disabledDates) {
      let customDate = moment().format("YYYY-MM-DD");
      return current && current < moment(customDate, "YYYY-MM-DD");
    }

    return false;
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            showTime
            onChange={handleDateChange}
            disabledDate={isDateDisabled}
          />
        )}
      />
    </div>
  );
};

export default DateAndTimePicker;
