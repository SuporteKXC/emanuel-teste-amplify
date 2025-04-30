import { DateTime } from "luxon";

export function addBusinessDays(
  startDate: string,
  daysToAdd: number,
  holidays: string[] = []
) {
  let date = DateTime.fromISO(startDate);
  if (!date.isValid) {
    return startDate;
  }
  let addedDays = 0;

  const holidaySet = new Set(holidays);

  while (addedDays < daysToAdd) {
    date = date.plus({ days: 1 });

    if (
      date.weekday >= 1 &&
      date.weekday <= 5 &&
      !holidaySet.has(date.toISODate()!)
    ) {
      addedDays++;
    }
  }

  return date.setZone("America/Sao_Paulo", { keepLocalTime: true }).toISODate();
}
