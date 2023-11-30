import { getMonth } from './calendarUtils';

test('expect 2023 to render correctly', () => {
  let res = getMonth(0, 2023, {includeDaysOfTheWeek: true, includeHeading: true, startOfTheWeek: "sun"}); // Jan
  expect(res).toEqual(expect.arrayContaining(['January 2023', 'Su Mo Tu We Th Fr Sa', ' 1  2  3  4  5  6  7', ' 8  9 10 11 12 13 14', '15 16 17 18 19 20 21', '22 23 24 25 26 27 28', '29 30 31']));

  res = getMonth(1, 2023, {includeDaysOfTheWeek: true, includeHeading: true, startOfTheWeek: "sun"}); // Feb
  expect(res).toEqual(expect.arrayContaining(["February 2023", "Su Mo Tu We Th Fr Sa", "          1  2  3  4", " 5  6  7  8  9 10 11", "12 13 14 15 16 17 18", "19 20 21 22 23 24 25", "26 27 28"]));

  res = getMonth(2, 2023, {includeDaysOfTheWeek: true, includeHeading: true, startOfTheWeek: "sun"}); // Feb
  expect(res).toEqual(expect.arrayContaining(["March 2023", "Su Mo Tu We Th Fr Sa", "          1  2  3  4", " 5  6  7  8  9 10 11", "12 13 14 15 16 17 18", "19 20 21 22 23 24 25", "26 27 28 29 30 31"]));
});


