export const get_date_only = (date: Date) => {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
};

export const isPastDate = (date:Date)=>{
    return get_date_only(date) < get_date_only(new Date())
}