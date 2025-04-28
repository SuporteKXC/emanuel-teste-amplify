import { SchedulingTimeType, SchedulingTimes } from "interfaces/company";

export const SchedulingTimeOptions: SchedulingTimes[] = [
  {
    label: "Mesmo dia",
    value: SchedulingTimeType["Mesmo dia"],
  },
  {
    label: "Dia seguinte",
    value: SchedulingTimeType["24H"],
  },
  {
    label: "2 dias depois",
    value: SchedulingTimeType["48H"],
  },
  {
    label: "3 dias depois",
    value: SchedulingTimeType["72H"],
  },
];
