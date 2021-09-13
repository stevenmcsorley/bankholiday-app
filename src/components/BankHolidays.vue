<template>
  <section>
    <div>
      <select @change="onChange($event)" v-model="selected">
        <option disabled value="">Please select region</option>
        <option value="england-and-wales">England and Wales</option>
        <option value="northern-ireland">Northern Ireland</option>
        <option value="scotland">Scotland</option>
      </select>
    </div>
    <div>
      <!-- {{ bankHolidayEvents }} -->
      <ul>
        <li v-for="(bankHoliday, key) in bankHolidayEvents" :key="key">
          <h4>{{ bankHoliday.title }}</h4>
          <p>{{ bankHoliday.date }}</p>
          <p>{{ bankHoliday.note }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Region, Event } from "./../interfaces/IBankHolidays";
import { dateFormatterService } from "../services/DateFormatterService";
import ApiFactory from "./../repo/ApiFactory";
const Api = ApiFactory.get("bankholidays");

@Component({})
export default class BankHolidays extends Vue {
  isLoading = false;
  selected = "";
  data: { [key: string]: Region } = {};
  regionEvents: Event[] | undefined = [];
  async created(): Promise<void> {
    await this.fetchBankHolidays();
  }

  async fetchBankHolidays(): Promise<void> {
    try {
      this.isLoading = true;
      const data = await Api.getAll();
      this.data = data.data;
    } catch (e) {
      console.log(e);
    }
  }

  onChange(event: { target: { value: unknown } }): void {
    let region = event.target.value;
    this.getTodaysBankHoliday(`${region}`);
  }

  getTodaysBankHoliday(region: string): Event[] | undefined {
    let now = Date.now();
    let twelvemoths = dateFormatterService.dateInFutureByMonthCount(12);
    let startDate = now;
    let endDate = twelvemoths;

    let regionData = this.data[`${region}`];
    let filteredEvents: Event[] | undefined = regionData.events?.map(
      (a: Event) => {
        return {
          date: new Date(a.date),
          title: a.title,
          notes: a.notes,
          bunting: a.bunting,
        };
      }
    );

    this.regionEvents = filteredEvents?.filter((d) => {
      return d.date > startDate && d.date < endDate;
    });
    return this.regionEvents;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get bankHolidayEvents() {
    return this.regionEvents?.map((b) => {
      return {
        date: dateFormatterService.dateShortWithOrdinal(b.date),
        title: b.title,
        notes: b.notes,
        bunting: b.bunting,
      };
    });
  }
}
</script>
