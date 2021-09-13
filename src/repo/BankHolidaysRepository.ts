import { AxiosResponse } from "axios";
import GovApi from "./Base";

const endpoint = {
  bankholidays: "bank-holidays.json",
};
export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll(): Promise<AxiosResponse<any>> {
    return GovApi.get(`${endpoint.bankholidays}`);
  },
};
