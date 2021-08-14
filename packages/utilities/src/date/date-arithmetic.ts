import { DateTime, DurationObject } from 'luxon';

export enum TimeUnit {
  Year = 'Year',
  Month = 'Month',
  Day = 'Day',
  Hour = 'Hour',
  Minute = 'Minute',
  Second = 'Second',
  Millisecond = 'Millisecond',
}

export function addTime(date: Date, amount: number, timeUnit: TimeUnit): Date {
  const integerAmount = Math.floor(amount);
  const luxonDurationObject = getLuxonDurationObject(integerAmount, timeUnit);
  return DateTime.fromJSDate(date).plus(luxonDurationObject).toJSDate();
}

function getLuxonDurationObject(
  amount: number,
  timeUnit: TimeUnit
): DurationObject {
  switch (timeUnit) {
    case TimeUnit.Year:
      return { year: amount };
    case TimeUnit.Month:
      return { month: amount };
    case TimeUnit.Day:
      return { day: amount };
    case TimeUnit.Hour:
      return { hour: amount };
    case TimeUnit.Minute:
      return { minute: amount };
    case TimeUnit.Second:
      return { second: amount };
    case TimeUnit.Millisecond:
      return { millisecond: amount };
  }
}
