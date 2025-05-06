export * from "./Selects";

export const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]

export const dayOptions = daysOfWeek.map((label) => ({
  id: label,
  label,
  value: label,
}));
