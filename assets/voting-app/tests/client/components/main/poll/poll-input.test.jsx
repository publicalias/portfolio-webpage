"use strict";

//local imports

const PollInput = require("../../../../../scripts/client/components/main/poll/poll-input");

const { initTestPoll, testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, testSubmit } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(PollInput);

const testForm = initTestPoll(testShallow, "form");
const testView = initTestPoll(testShallow, "view");

const initTestChange = (render) => (type) => {

  const testChange = initTestEvent(render, "change", { target: { value: "Option A" } });

  return testChange(".qa-change-input", [], [type, ["Option A"]]);

};

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollInput));

//poll input

describe("PollInput (form)", () => {

  const testSnapshot = initTestSnapshot(testForm);

  const testChange = initTestChange(testForm);
  const testClick = initTestEvent(testForm, "click");

  it("should match snapshot", () => testSnapshot());

  it("should call handleChange on change", () => testChange("formSetAdd"));

  it("should call handleSubmit on click", () => testClick(
    ".qa-submit-input",
    [{ form: { add: "Option A" } }],
    ["formAddOption", ["Option A", []]]
  ));

});

describe("PollInput (view)", () => {

  const testSnapshot = initTestSnapshot(testView);

  const testChange = initTestChange(testView);
  const testClick = initTestEvent(testView, "click");

  it("should match snapshot", () => testSnapshot());

  it("should call handleChange on change", () => testChange("viewSetAdd"));

  testSubmit("click", "handleSubmit", (res) => testClick(
    ".qa-submit-input",
    [
      { view: { add: "Option A" } },
      { id: "id-a" },
      null,
      { actions: { pollAddOption: jest.fn(() => res) } }
    ],
    ["pollAddOption", ["id-a", "Option A"]],
    ["viewSetAdd", res && !res.errors ? [""] : undefined]
  ));

});
