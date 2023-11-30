import { CalendarConfig } from './app';

const doubleSpaceNumber = (dateString: string) =>
  dateString.length == 1 ? " " + dateString : dateString;

export function getMonth(
  monthNumeric: number,
  yearNumeric: number,
  calendarConfig: CalendarConfig
) {
  const { includeDaysOfTheWeek, includeHeading, startOfTheWeek } =
    calendarConfig;
  const date = new Date();

  date.setMonth(monthNumeric);
  date.setFullYear(yearNumeric);
  date.setDate(1);

  const options = {
    month: "long",
    year: "numeric",
  } as Intl.DateTimeFormatOptions;

  let month: Array<string> = [];
  if (includeHeading === true)
    month.push(new Intl.DateTimeFormat("en-US", options).format(date));

  if (includeDaysOfTheWeek === true) {
    if (startOfTheWeek === "sun") {
      month.push("Su Mo Tu We Th Fr Sa");
    } else {
      month.push("Mo Tu We Th Fr Sa Su");
    }
  }

  let weekOfDates: Array<string> = [];

  if (startOfTheWeek === "sun") {
    for (let i = date.getDay(); i > 0; i--) {
      weekOfDates.push("  ");
    }
  } else {
    const count = date.getDay() === 0 ? 6 : date.getDay() - 1;
    for (let i = 0; i < count; i++) {
      weekOfDates.push("  ");
    }
  }

  const startOfTheWeekDay = startOfTheWeek === "sun" ? 0 : 1;
  const currentMonth = date.getMonth();

  while (date.getMonth() === currentMonth) {
    const numericalDate = date.getDate();
    weekOfDates.push(doubleSpaceNumber(numericalDate.toString()));

    date.setDate(date.getDate() + 1);
    if (date.getDay() === startOfTheWeekDay) {
      month.push(weekOfDates.join(" "));
      weekOfDates = [];
    }
  }

  month.push(weekOfDates.join(" "));

  return month;
}
