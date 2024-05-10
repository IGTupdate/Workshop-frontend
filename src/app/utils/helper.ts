export const get_date_only = (date: Date) => {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
};

export const isPastDate = (date: Date) => {
  return get_date_only(date) < get_date_only(new Date());
};

export const setQueryParams = (
  url: string,
  name: string,
  value: string,
): string => {
  const params = new URLSearchParams(url);
  params.set(name, value);
  return params.toString();
};

export const removeQueryParams = (url: string, name: string): string => {
  const params = new URLSearchParams(url);
  params.delete(name);
  return params.toString();
};

export const removeAllQueryParams = (url: string) => {
  const params = new URLSearchParams(url);
  Object.keys(params).forEach((key) => {
    params.delete(key);
  });
};

export const minutesToHoursConverter = (minutes: number) => {
  if (minutes > 59) {
    return minutes / 60;
  }

  return "0." + minutes;
};

export const PriceCalculator = (originalPrice: number) => {
  return Math.round(originalPrice * 1.3);
};
