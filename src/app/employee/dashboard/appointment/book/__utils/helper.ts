export const getFormattedDateForSlotAvailabilityFilter = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const dayOfWeek = days[date.getDay()];

    return `${day} ${month}, ${dayOfWeek}`;
}