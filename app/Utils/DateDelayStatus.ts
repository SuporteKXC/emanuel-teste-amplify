import { addDays, isAfter } from "date-fns";

export default class DateDelayStatus{

  public delayStatus(date: any, number: number): Boolean {
    const dateNow = new Date();

    const dateDelay = new Date(date);

    const dateDelayMax = addDays(dateDelay, number)

    const dateIsAfter = isAfter(dateNow, dateDelayMax);

    return dateIsAfter;
  }

}