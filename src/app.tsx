import {
  Button,
  Switch,
  FormField,
  Select,
  Rows,
  RadioGroup,
} from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import * as React from "react";
import styles from "styles/components.css";

enum Days {
  SUN = "sun",
  MON = "mon",
}

export interface CalendarConfig {
  includeDaysOfTheWeek: boolean;
  includeHeading: boolean;
  startOfTheWeek: Days;
}

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

  date.setDate(1);
  date.setFullYear(yearNumeric);
  date.setMonth(monthNumeric);

  const options = {
    month: "long",
    year: "numeric",
  } as Intl.DateTimeFormatOptions;

  let month: Array<string> = [];
  if (includeHeading === true)
    month.push(new Intl.DateTimeFormat("en-US", options).format(date));

  if (includeDaysOfTheWeek === true) {
    if (startOfTheWeek === Days.SUN) {
      month.push("Su Mo Tu We Th Fr Sa");
    } else {
      month.push("Mo Tu We Th Fr Sa Su");
    }
  }

  let weekOfDates: Array<string> = [];

  if (startOfTheWeek === Days.SUN) {
    for (let i = date.getDay(); i > 0; i--) {
      weekOfDates.push("  ");
    }
  } else {
    const count = date.getDay() === 0 ? 6 : date.getDay() - 1;
    for (let i = 0; i < count; i++) {
      weekOfDates.push("  ");
    }
  }

  const startOfTheWeekDay = startOfTheWeek === Days.SUN ? 0 : 1;
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

const listOfMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthSelect = ({
  initialValue,
  onChange,
}: {
  initialValue: string;
  onChange: (value: string) => void;
}) => {
  const options: Array<{ value: string; label: string }> = listOfMonths.map(
    (label, index) => ({ value: "" + index, label })
  );
  return <Select value={initialValue} options={options} onChange={onChange} />;
};

const YearSelect = ({
  initialValue,
  onChange,
}: {
  initialValue: string;
  onChange: (value: string) => void;
}) => {
  const options: Array<{ value: string; label: string }> = [];
  const date = new Date();
  const previousYear = date.getFullYear() - 10;

  for (let i = previousYear; i < date.getFullYear() + 10; i++) {
    options.push({ value: i.toString(), label: i.toString() });
  }

  return <Select value={initialValue} options={options} onChange={onChange} />;
};

const options = [
  {
    value: Days.SUN,
    label: "Sunday",
  },
  {
    value: Days.MON,
    label: "Monday",
  },
];

export const App = () => {
  const date = new Date();
  const [startMonth, setStartMonth] = React.useState<string>("0");
  const [startYear, setStartYear] = React.useState<string>(
    date.getFullYear().toString()
  );

  const [calendarConfig, setCalendarConfig] = React.useState<CalendarConfig>({
    includeDaysOfTheWeek: true,
    includeHeading: true,
    startOfTheWeek: Days.SUN,
  });

  const onStartMonthChange = (value: string) => setStartMonth(value);
  const onStartYearChange = (value: string) => setStartYear(value);
  const onStartDayChange = (value: Days) =>
    setCalendarConfig((prevState) => ({
      ...prevState,
      startOfTheWeek: value,
    }));

  const onIncludeHeadingChange = (value: boolean) =>
    setCalendarConfig((prevState) => ({
      ...prevState,
      includeHeading: value,
    }));

  const onIncludeDaysOfWeekChange = (value: boolean) =>
    setCalendarConfig((prevState) => ({
      ...prevState,
      includeDaysOfTheWeek: value,
    }));

  const onClick = () => {
    const data = getMonth(
      Number.parseInt(startMonth),
      Number.parseInt(startYear),
      calendarConfig
    );

    if (data !== undefined) {
      addNativeElement({
        type: "TEXT",
        children: [data.join("\n")],
      });
    }
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <FormField
          label="Month"
          description="Which month should the calendar use?"
          control={() => (
            <MonthSelect
              initialValue={startMonth}
              onChange={onStartMonthChange}
            />
          )}
        />
        <FormField
          label="Year"
          description="Which year should the calendar use?"
          control={() => (
            <YearSelect initialValue={startYear} onChange={onStartYearChange} />
          )}
        />
        <FormField
          label="First Day of the Week"
          description="What is the first day of the week?"
          control={() => (
            <RadioGroup
              options={options}
              defaultValue={calendarConfig.startOfTheWeek}
              onChange={onStartDayChange}
              disabled={calendarConfig.includeDaysOfTheWeek === false}
            />
          )}
        />
        <Switch
          label="Include Month and Year Heading?"
          value={calendarConfig.includeHeading}
          onChange={onIncludeHeadingChange}
        />

        <Switch
          label="Include Days of the Week?"
          value={calendarConfig.includeDaysOfTheWeek}
          onChange={onIncludeDaysOfWeekChange}
        />

        <Button variant="primary" onClick={onClick} stretch>
          Add Calendar
        </Button>
      </Rows>
    </div>
  );
};
