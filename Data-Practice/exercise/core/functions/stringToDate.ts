export function stringToDate(text: string): Date {
  const [date, time] = text.split(" ");
  const [day, month, year] = date.split("/").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const monthIndex = month - 1;
  return new Date(year, monthIndex, day, hour, minute);
}
