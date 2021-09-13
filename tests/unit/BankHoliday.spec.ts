import { config, mount, createLocalVue, shallowMount } from "@vue/test-utils";
config.showDeprecationWarnings = false;
import BankHolidays from "@/components/BankHolidays.vue";
import { dateFormatterService } from "../../src/services/DateFormatterService";

dateFormatterService.dateShortWithOrdinal = jest.fn();
const localVue = createLocalVue();

const fetchBankHolidays = jest.fn();
const options = {
  methods: {
    fetchBankHolidays,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any = null;
beforeEach(() => {
  wrapper = mount(BankHolidays, {
    localVue,
    ...options,
  });
});

describe("BankHolidays.vue", () => {
  it("renders a vue component by name and instance", () => {
    wrapper = wrapper.findComponent(BankHolidays);
  });

  it("should call fetchBankHolidays on created", async () => {
    const component: any = createComponent();
    await component.vm.fetchBankHolidays();
    expect(fetchBankHolidays).toHaveBeenCalled();
  });

  it("should call onchange when selectt is clicked", async () => {
    const component: any = createComponent();
    const onChangeSpy = jest.spyOn(component.vm, "onChange");
    const select = component.find("select");
    select.trigger("change");
    await component.vm.$nextTick();
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it("should call getTodaysBankHoliday when select is changed", async () => {
    const component: any = createComponent();
    component.setData({
      selected: { id: "northern-ireland", name: "Northern Ireland" },
    });

    const date = new Date("26-12-2021");

    component.setData({
      regionEvents: [
        {
          bunting: true,
          date: dateFormatterService.dateShortWithOrdinal(date),
          notes: "Substitute day",
          title: "Christmas Day",
        },
      ],
    });
    const getTodaysBankHolidaySpy = jest.spyOn(
      component.vm,
      "getTodaysBankHoliday"
    );
    const select = component.find("select").findAll("option");
    select.at(1).trigger("change");
    await component.vm.$nextTick();
    expect(getTodaysBankHolidaySpy).toHaveBeenCalledWith("northern-ireland");
    expect(component.vm.bankHolidayEvents).toStrictEqual([
      {
        bunting: true,
        date: undefined,
        notes: "Substitute day",
        title: "Christmas Day",
      },
    ]);
  });

  it("selects", async () => {
    const component: any = createComponent();
    const select = component.find("select").findAll("option");
    select.at(1).setSelected();
    await component.vm.$nextTick();
    expect(component.vm.selected).toStrictEqual({
      id: "england-and-wales",
      text: "England and Wales",
    });
  });

  it("it matches snapshot", () => {
    expect(wrapper).toMatchInlineSnapshot(`
      <section class="wrapper">
        <h4 class="dev-u-padding-vertical">
          Bank Holiday Viewer
          <span></span>
        </h4>
        <div class="dev-u-padding-vertical"><label class="dev-label">Region Select</label> <select class="dev-select">
            <option disabled="disabled" selected="selected" hidden="hidden" value="[object Object]">
              Please select region
            </option>
            <option value="[object Object]">
              England and Wales
            </option>
            <option value="[object Object]">
              Northern Ireland
            </option>
            <option value="[object Object]">
              Scotland
            </option>
          </select></div>
        <div>
          <ul></ul>
        </div>
      </section>
    `);
  });
});

function createComponent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: any = shallowMount(BankHolidays, {
    ...options,
  });
  return component;
}
