"use strict";

//local imports

const PollInput = require("../../../../../scripts/client/components/main/poll/poll-input");

const { initTestPoll, testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(PollInput);

const testForm = initTestPoll(testShallow, "form");
const testView = initTestPoll(testShallow, "view");

const initTestChange = (render) => (type) => {

  const testChange = initTestEvent(render, "change", { target: { value: "Option A" } });

  return testChange(".qa-option-input", [], [type, ["Option A"]]);

};

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollInput));

//poll input

describe("poll input (form)", () => {

  const testSnapshot = initTestSnapshot(testForm);

  const testChange = initTestChange(testForm);
  const testClick = initTestEvent(testForm, "click");

  it("should match snapshot", () => testSnapshot());

  it("should call formSetAdd on change", () => testChange("formSetAdd"));

  it("should call formAddOption on click", () => {

    const dataList = [{ form: { add: "Option A" } }];

    return testClick(".qa-option-submit", dataList, ["formAddOption", ["Option A", []]]);

  });

});

describe("poll input (view)", () => {

  const testSnapshot = initTestSnapshot(testView);

  const testChange = initTestChange(testView);

  const testClick = (res) => {

    const dataList = [
      { view: { add: "Option A" } },
      { id: "id-a" },
      null,
      { actions: { pollAddOption: jest.fn(() => res) } }
    ];

    const fnList = [
      ["pollAddOption", ["id-a", "Option A"]],
      ["viewSetAdd", res && !res.errors ? [""] : undefined]
    ];

    return testReload(testView, dataList, ".qa-option-submit", "id-a", ...fnList);

  };

  it("should match snapshot", () => testSnapshot({ view: { add: "Option A" } }));

  it("should call viewSetAdd on change", () => testChange("viewSetAdd"));

  it("should call pollAddOption on click (failure)", () => testClick());

  it("should call pollAddOption on click (errors)", () => testClick({ errors: [] }));

  it("should call pollAddOption and viewSetAdd on click (success)", () => testClick({}));

});
