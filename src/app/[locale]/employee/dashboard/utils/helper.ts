interface Time {
  hour: number;
  minute: number;
}

export const formatTime = (time: Time): string => {
  const hour = time.hour;
  const amPm = time.hour < 12 ? "AM" : "PM"; // Determine AM or PM
  const minute = time.minute < 10 ? `0${time.minute}` : time.minute; // Add leading zero if minute is less than 10
  return `${hour}:${minute} ${amPm}`;
};
