//Our APi factory

import BankHolidaysApi from "./BankHolidaysRepository";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const api: any = {
  bankholidays: BankHolidaysApi,
};
export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get: (name: string | number) => {
    return api[name];
  },
};
