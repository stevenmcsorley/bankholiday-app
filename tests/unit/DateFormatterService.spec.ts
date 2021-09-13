import "ts-jest";

import { dateFormatterService } from "@/services/DateFormatterService";

describe("Date formatter service", () => {
  it("should return the date in short format with ordinals", () => {
    const date1 = dateFormatterService.dateShortWithOrdinal(
      new Date("2021-9-11")
    );
    expect(date1).toEqual("11th Sep, 2021");
  });

  it("should return a date in the future by passing plus month count", () => {
    const date2 = dateFormatterService.dateInFutureByMonthCount(12);
    expect(date2).toBeGreaterThan(Date.now());
  });
});
