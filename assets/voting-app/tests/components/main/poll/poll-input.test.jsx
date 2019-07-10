"use strict";

//local imports

const PollInput = require("../../../../scripts/components/main/poll/poll-input");

const { initTestPoll, testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const testLoad = (render, args) => {

  const { submitKeys } = Object.assign(PollInput.injected, { submitKeys: jest.fn() });

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

beforeEach(() => {
  PollInput.injected.submitKeys = jest.fn();
});

//poll input

describe("poll input (form)", () => {

  const { testMount, testShallow } = testWrapper(PollInput);

  const testSnapshot = initTestSnapshot(testShallow);
  const testForm = initTestPoll(testSnapshot, "form");
  const testFormMount = initTestPoll(testMount, "form");
  const testClick = initTestEvent(testFormMount, "click");

  it("should match snapshot (default)", () => testForm());

  it("should match snapshot (add)", () => testForm({ form: { add: "Option A" } }));

  it("should call submitKeys on load", () => testLoad(testFormMount, ["form"]));

  it("should call formSetAdd on change", () => testChange(testFormMount, "formSetAdd"));

  it("should call formAddOption and formSetAdd on submit", () => {

    const dataList = [{ form: { add: "Option A" } }];

    return testClick(".qa-option-submit", dataList, ["formAddOption", []], ["formSetAdd", [""]]);

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

  it("should call pollAddOption and viewSetAdd on submit", () => {

    const dataList = [{ view: { add: "Option A" } }, { id: "id-a" }];
    const fnList = [
      ["pollAddOption", ["id-a", "Option A"]],
      ["viewSetAdd", [""]]
    ];

    return testReload(testViewMount, dataList, ".qa-option-submit", "id-a", ...fnList);

  });

});