"use strict";

//local imports

const PollInput = require("../../../../../scripts/client/components/main/poll/poll-input");

const { initTestPoll, testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(PollInput);

const testSnapshot = initTestSnapshot(testShallow);

const testLoad = (render, args) => {

  const { lib: { submitKeys } } = PollInput.injected;

  const { wrapper } = render();

  wrapper.mount();

  testMock(submitKeys, args);

  wrapper.unmount();

};

const testChange = (render, type) => {

  const testChange = initTestEvent(render, "change", { target: { value: "Option A" } });

  return testChange(".qa-option-input", [], [type, ["Option A"]]);

};

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollInput));

//poll input

describe("poll input (form)", () => {

  const testForm = initTestPoll(testSnapshot, "form");
  const testFormMount = initTestPoll(testMount, "form");

  const testClick = initTestEvent(testFormMount, "click");

  it("should match snapshot", () => testForm({ form: { add: "Option A" } }));

  it("should call submitKeys on load", () => testLoad(testFormMount, ["form"]));

  it("should call formSetAdd on change", () => testChange(testFormMount, "formSetAdd"));

  it("should call formAddOption on submit", () => {

    const dataList = [{ form: { add: "Option A" } }];

    return testClick(".qa-option-submit", dataList, ["formAddOption", ["Option A", []]]);

  });

});

describe("poll input (view)", () => {

  const testView = initTestPoll(testSnapshot, "view");
  const testViewMount = initTestPoll(testMount, "view");

  const testSubmit = (res) => {

    const dataList = [{ view: { add: "Option A" } }, { id: "id-a" }, null, { actions: { pollAddOption: jest.fn(() => res) } }];
    const fnList = [
      ["pollAddOption", ["id-a", "Option A"]],
      ["viewSetAdd", res && !res.errors ? [""] : undefined]
    ];

    return testReload(testViewMount, dataList, ".qa-option-submit", "id-a", ...fnList);

  };

  it("should match snapshot", () => testView({ view: { add: "Option A" } }));

  it("should call submitKeys on load", () => testLoad(testViewMount, ["view"]));

  it("should call viewSetAdd on change", () => testChange(testViewMount, "viewSetAdd"));

  it("should call pollAddOption on submit (failure)", () => testSubmit());

  it("should call pollAddOption on submit (errors)", () => testSubmit({ errors: [] }));

  it("should call pollAddOption and viewSetAdd on submit (success)", () => testSubmit({}));

});
