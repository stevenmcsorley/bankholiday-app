class DateFormatterService {
  dateInFutureByMonthCount(val: number) {
    const date = new Date();
    return date.setMonth(date.getMonth() + val);
  }
  dateShortWithOrdinal(currentDate: Date): string {
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    function ordinal(n: number) {
      const s = ["th", "st", "nd", "rd"],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }
    return ordinal(date) + " " + monthNames[month] + ", " + year;
  }
}
export const dateFormatterService = new DateFormatterService();
