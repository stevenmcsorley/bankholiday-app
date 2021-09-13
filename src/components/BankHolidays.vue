<template>
  <section class="wrapper">
    <h4 class="dev-u-padding-vertical">
      Bank Holiday Viewer
      <span v-if="{ selected }">{{ selected.text }}</span>
    </h4>
    <div class="dev-u-padding-vertical">
      <label class="dev-label">Region Select</label>
      <select class="dev-select" @change="onChange()" v-model="selected">
        <option :value="{ id: '', name: '' }" disabled selected hidden>
          {{ defaultValue }}
        </option>
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
      <ul>
        <li v-for="(bankHoliday, key) in bankHolidayEvents" :key="key">
          <div
            class="dev-card-base dev-u-padding-default dev-u-margin-vertical"
            :class="{ 'dev-card-base--highlight': key == 0 }"
          >
            <div class="dev-grid-wrapper__div--row--3">
              <div>
                <h4>{{ bankHoliday.title }}</h4>
              </div>
              <div>
                <p>{{ bankHoliday.date }}</p>
              </div>
              <div>
                <p>{{ bankHoliday.notes }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Region, Event, IRegionSelect } from "./../interfaces/IBankHolidays";
import { dateFormatterService } from "../services/DateFormatterService";
import ApiFactory from "./../repo/ApiFactory";
const Api = ApiFactory.get("bankholidays");

@Component({})
export default class BankHolidays extends Vue {
  isLoading = false;
  selected: IRegionSelect = {
    id: "",
    name: "",
  };
  defaultValue = "Please select region";
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

  mounted(): void {
    this.getTodaysBankHoliday("england-and-wales");
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
    return (
      this.regionEvents?.map((b) => {
        return {
          date: dateFormatterService.dateShortWithOrdinal(b.date),
          title: b.title,
          notes: b.notes,
          bunting: b.bunting,
        };
      }) ?? []
    );
  }
}
</script>
