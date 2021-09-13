import { mount, createLocalVue } from "@vue/test-utils";
import Home from "@/views/Home.vue";

const localVue = createLocalVue();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wrapper: any = null;
beforeEach(() => {
  wrapper = mount(Home, {
    localVue,
  });
});

describe("Home.vue", () => {
  it("renders a vue component by name and instance", () => {
    wrapper = wrapper.findComponent(Home);
  });
  it("it matches snapshot", () => {
    expect(wrapper).toMatchInlineSnapshot(`
      <div class="home">
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
      </div>
    `);
  });
});
