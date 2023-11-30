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
import { getMonth } from './calendarUtils';

export interface CalendarConfig {
  includeDaysOfTheWeek: boolean;
  includeHeading: boolean;
  startOfTheWeek: "sun" | "mon";
};

const listOfMonths = (() => {
  // todo: I need to localise this
  return [
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
})();


const MonthSelect = ({
  initialValue,
  onChange,
}: {
  initialValue: string;
  onChange: (value: string) => void;
}) => {
  const options: Array<{ value: string; label: string }> = [];
  listOfMonths.forEach((month, index) => {
    options.push({ value: "" + index, label: month });
  });

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

export const App = () => {
  const date = new Date();
  const [startMonth, setStartMonth] = React.useState<string>("0");
  const [startYear, setStartYear] = React.useState<string>(
    date.getFullYear().toString()
  );

  const [calendarConfig, setCalendarConfig] = React.useState<CalendarConfig>({
    includeDaysOfTheWeek: true,
    includeHeading: true,
    startOfTheWeek: "sun",
  });

  const onStartMonthChange = (value: string) => setStartMonth(value);
  const onStartYearChange = (value: string) => setStartYear(value);
  const onStartDayChange = (value: "sun" | "mon") =>
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

  const options = [
    {
      value: "sun",
      label: "Sunday",
    },
    {
      value: "mon",
      label: "Monday",
    },
  ];

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
