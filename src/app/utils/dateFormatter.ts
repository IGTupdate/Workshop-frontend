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

export function extractTimeFromDate(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0'); // Ensure two digits for hours
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes
    return `${hours}:${minutes}`;
}

export function formatDateAndTime(dateString : string) {
    const date = new Date(dateString);
    
    // Get day, month, year
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    
    // Get hours and minutes
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}