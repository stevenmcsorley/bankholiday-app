<template>
  <section class="wrapper">
    <h4 class="dev-u-padding-vertical">
      Bank Holiday Viewer
      <span v-if="{ selected }">{{ selected.text }}</span>
    </h4>
    <div class="dev-u-padding-vertical">
      <label class="dev-label">Region Select</label>
      <select class="dev-select" @change="onChange($event)" v-model="selected">
        <option disabled value="">Please select region</option>
        <option
          v-for="(option, key) in regionSelects"
          :key="key"
          :value="{ id: option.id, text: option.name }"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <div>
      <!-- {{ bankHolidayEvents }} -->
      <ul>
        <li v-for="(bankHoliday, key) in bankHolidayEvents" :key="key">
          <div
            class="dev-card-base dev-u-padding-default dev-u-margin-vertical"
          >
            <h4>{{ bankHoliday.title }}</h4>
            <p>{{ bankHoliday.date }}</p>
            <p>{{ bankHoliday.note }}</p>
          </div>
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
  regionSelects = [
    { id: "england-and-wales", name: "England and Wales" },
    { id: "northern-ireland", name: "Northern Ireland" },
    { id: "scotland", name: "Scotland" },
  ];
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

  onChange(): void {
    let region = this.selected;
    this.getTodaysBankHoliday(`${region.id}`);
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
