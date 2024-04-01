export function convertToLocaleDateAndWeekday(dateString: string | undefined) {
    if(!dateString) return ''
    // Convert string to Date object
    const date = new Date(dateString);

    // Format date to "DD-MM-YYYY"
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);

    // Array of weekday names
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Get weekday value (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const weekdayValue = date.getDay();

    // Get weekday name
    const weekdayName = weekdays[weekdayValue];

    return formattedDate + ", " + weekdayName;
}

export function extractTimeFromDate(datetimeString: string): string {
    // Split the datetime string at 'T' to separate date and time
    const [datePart, timePart] = datetimeString.split('T');
    
    // Split the time part at '.' to remove milliseconds
    const [timeOnly] = timePart.split('.');
    
    // Return the time part
    return timeOnly
}