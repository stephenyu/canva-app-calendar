import { Button, FormField, Select, Rows, Text } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import * as React from "react";
import styles from "styles/components.css";

const listOfMonths = (() => {
  const date = new Date();
  date.setMonth(0);

  const monthNames: Array<string> = [];

  const options = {
    month: "long",
  } as Intl.DateTimeFormatOptions;

  for (let i = 0; i < 12; i++) {
    const monthHeading = new Intl.DateTimeFormat("en-US", options).format(date);
    monthNames.push(monthHeading);
    date.setMonth(date.getMonth() + 1);
  }

  return monthNames;
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
  const previousYear = date.getFullYear() - 1;

  for (let i = previousYear; i < previousYear + 5; i++) {
    options.push({ value: i.toString(), label: i.toString() });
  }

  return <Select value={initialValue} options={options} onChange={onChange} />;
};

const doubleSpaceNumber = (dateString: string) =>
  dateString.length == 1 ? " " + dateString : dateString;

function getMonth(monthNumeric: number, yearNumeric: number) {
  const date = new Date();

  date.setMonth(monthNumeric);
  date.setFullYear(yearNumeric);
  date.setDate(1);

  const options = {
    month: "long",
    year: "numeric",
  } as Intl.DateTimeFormatOptions;

  const monthHeading = new Intl.DateTimeFormat("en-US", options).format(date);

  const currentMonth = date.getMonth();

  const month: Array<string> = [monthHeading, "Su Mo Tu We Th Fr Sa"];
  let weekOfDates: Array<string> = [];

  for (let i = date.getDay(); i > 0; i--) {
    weekOfDates.push("  ");
  }

  while (date.getMonth() === currentMonth) {
    const numericalDate = date.getDate();
    weekOfDates.push(doubleSpaceNumber(numericalDate.toString()));

    date.setDate(date.getDate() + 1);
    if (date.getDay() === 0) {
      month.push(weekOfDates.join(" "));
      weekOfDates = [];
    }
  }

  month.push(weekOfDates.join(" "));

  return month;
}

export const App = () => {
  const date = new Date();
  const [startMonth, setStartMonth] = React.useState<string>(
    date.getMonth().toString()
  );
  const [startYear, setStartYear] = React.useState<string>(
    date.getFullYear().toString()
  );

  const onStartMonthChange = (value: string) => setStartMonth(value);
  const onStartYearChange = (value: string) => setStartYear(value);

  const onClick = () => {
    const data = getMonth(
      Number.parseInt(startMonth),
      Number.parseInt(startYear)
    );
    addNativeElement({
      type: "TEXT",
      children: [data.join("\n")],
    });
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>Select the starting and end date for your calendar.</Text>
        <FormField
          label="Start Month"
          description="Starting Month"
          control={() => (
            <MonthSelect
              initialValue={date.getMonth().toString()}
              onChange={onStartMonthChange}
            />
          )}
        />
        <FormField
          label="Start Year"
          description="Starting Year"
          control={() => (
            <YearSelect
              initialValue={date.getFullYear().toString()}
              onChange={onStartYearChange}
            />
          )}
        />

        <Button variant="primary" onClick={onClick} stretch>
          Add Calendar
        </Button>
      </Rows>
    </div>
  );
};
