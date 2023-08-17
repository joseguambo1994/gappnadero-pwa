import { getPercentageHeat } from "./heat";

test("Return the number of days before next heat", () => {
  const date1 = new Date(2023, 7, 1);
  const date2 = new Date(2023, 7, 14);
  const today = new Date();
  expect(getPercentageHeat(21, today, date1 )).toBe(71);
  expect(getPercentageHeat(21, today, date2 )).toBe(10);
});