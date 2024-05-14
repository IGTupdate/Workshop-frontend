export function convertToLocaleDateAndWeekday(dateString: string | undefined) {
  if (!dateString) return "";
  // Convert string to Date object
  const date = new Date(dateString);

  // Format date to "DD-MM-YYYY"
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  // Array of weekday names
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get weekday value (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const weekdayValue = date.getDay();

  // Get weekday name
  const weekdayName = weekdays[weekdayValue];

  return formattedDate + ", " + weekdayName;
}

export function extractTimeFromDate(dateString: string): string {
  // Get the current time as a string without seconds
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateAndTime(dateString: string) {
  return new Date(dateString).toLocaleString("en-GB");
}
