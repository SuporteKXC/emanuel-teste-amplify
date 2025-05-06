export class TimeHelper {
  public static roundUpMinutes(time: string, minutes: number): string {
    const [hour, minute] = time.split(':').map(Number);

    const newMinute = Math.ceil(minute / minutes) * minutes;
    const newHour = hour + Math.floor(newMinute / 60);

    const newMinuteString = `${newMinute % 60}`.padStart(2, '0');
    const newHourString = `${newHour % 24}`.padStart(2, '0');

    return `${newHourString}:${newMinuteString}`;
  }

  public static roundDownMinutes(time: string, minutes: number): string {
    const [hour, minute] = time.split(':').map(Number);

    const newMinute = Math.floor(minute / minutes) * minutes;
    const newHour = hour + Math.floor(newMinute / 60);

    const newMinuteString = `${newMinute % 60}`.padStart(2, '0');
    const newHourString = `${newHour % 24}`.padStart(2, '0');

    return `${newHourString}:${newMinuteString}`;
  }
}
