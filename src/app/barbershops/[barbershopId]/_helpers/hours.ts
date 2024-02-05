import { setHours, setMinutes, format, addMinutes } from "date-fns";

export function generateDayTimeList(date: Date, startTimeInHours = 9, endTimeInHours = 21, intervalInMinutes = 45): string[] {
  const startTime = setMinutes(setHours(date, startTimeInHours), 0); // Set start time to 09:00
  const endTime = setMinutes(setHours(date, endTimeInHours), 0); // Set end time to 21:00
  const interval = intervalInMinutes; // interval in minutes
  const timeList: string[] = [];

  let currentTime = startTime;

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}