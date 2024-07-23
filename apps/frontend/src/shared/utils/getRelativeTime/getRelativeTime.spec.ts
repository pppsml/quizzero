import { expect, test } from "vitest";

import { getRelativeTime } from "./";

const initialGetRelativeTimeReturn: ReturnType<typeof getRelativeTime> = {
  year: 0,
  month: 0,
  week: 0,
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
};

test("should returns 1 year and 2 days ago", () => {
  expect(
    JSON.stringify(
      getRelativeTime(new Date("2023-07-11T08:00:00.000+00:00"), {
        minuendDate: new Date("2024-07-11T08:00:00.000+00:00"),
      })
    )
  ).toEqual(
    JSON.stringify({
      ...initialGetRelativeTimeReturn,
      year: 1,
      day: 2,
    })
  );
});

test("should return 0", () => {
  expect(
    JSON.stringify(
      getRelativeTime(new Date("2024-07-11T08:00:00.000+00:00"), {
        minuendDate: new Date("2024-07-11T08:00:00.000+00:00"),
      })
    )
  ).toEqual(
    JSON.stringify({
      ...initialGetRelativeTimeReturn,
    })
  );
});
