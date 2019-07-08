"use strict";

//local imports

const PollInput = require("../../../../scripts/components/main/poll/poll-input");

const { initTestPoll, testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const testLoad = (render, args) => {

  const { submitKeys } = Object.assign(PollInput.injected, { submitKeys: jest.fn() });

  const { wrapper } = render();

  wrapper.mount();

  testMock(submitKeys, args);

  wrapper.unmount();

};

const testChange = (render, type) => {

  const { props, wrapper } = render();

  wrapper.find(".qa-option-input").simulate("change", { target: { value: "Option A" } });

  testMock(props.actions[type], ["Option A"]);

  wrapper.unmount();

};

//setup

beforeAll(reactTests.setup);

beforeEach(() => {
  PollInput.injected.submitKeys = jest.fn();
});

//poll input

describe("poll input (form)", () => {

  const { testMount, testShallow } = testWrapper(PollInput);

  const testSnapshot = initTestSnapshot(testShallow);
  const testForm = initTestPoll(testSnapshot, "form");
  const testFormMount = initTestPoll(testMount, "form");

  it("should match snapshot (default)", () => testForm());

  it("should match snapshot (add)", () => testForm({ form: { add: "Option A" } }));

  it("should call submitKeys on load", () => testLoad(testFormMount, ["form"]));

  it("should call formSetAdd on change", () => testChange(testFormMount, "formSetAdd"));

  it("should call formAddOption and formSetAdd on submit", () => {

    const { props, wrapper } = testFormMount({ form: { add: "Option A" } });

    const { actions: { formAddOption, formSetAdd } } = props;

    wrapper.find(".qa-option-submit").simulate("click");

    testMock(formAddOption, []);
    testMock(formSetAdd, [""]);

    wrapper.unmount();

  });

});

describe("poll input (view)", () => {

  const { testMount, testShallow } = testWrapper(PollInput);

  const testSnapshot = initTestSnapshot(testShallow);
  const testView = initTestPoll(testSnapshot, "view");
  const testViewMount = initTestPoll(testMount, "view");

  it("should match snapshot (default)", () => testView());

  it("should match snapshot (add)", () => testView({ view: { add: "Option A" } }));

  it("should call submitKeys on load", () => testLoad(testViewMount, ["view"]));

  it("should call viewSetAdd on change", () => testChange(testViewMount, "viewSetAdd"));

  it("should call pollAddOption and viewSetAdd on submit", async () => {

    const { props, wrapper } = testViewMount({ view: { add: "Option A" } }, { id: "id-a" });

    const { actions: { viewSetAdd } } = props;

    await testReload(props, wrapper, ".qa-option-submit", "pollAddOption", ["id-a", "Option A"]);

    testMock(viewSetAdd, [""]);

  });

});
