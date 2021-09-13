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
    expect(wrapper).toMatchInlineSnapshot(`null`);
  });
});
