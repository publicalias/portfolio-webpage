"use strict";

//local imports

const PollChart = require("../../../../../scripts/client/components/main/poll/poll-chart");

const { newOption } = require("../../../../../schemas");
const { initTestPoll, testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(PollChart);

const testForm = initTestPoll(testShallow, "form");
const testFormMount = initTestPoll(testMount, "form");

const testView = initTestPoll(testShallow, "view");
const testViewMount = initTestPoll(testMount, "view");

const testLoad = (render, role) => {

  const { lib: { renderChart, rngInt } } = PollChart.injected;

  const { setProps, wrapper } = render(null, { options: [] });

  wrapper.mount();

  setProps(null, { poll: { options: [role === "form" ? "Option A" : newOption({ text: "Option A" })] } });

  if (role === "form") {
    testMock(rngInt, [0, 9, true]);
  }

  testMock(renderChart, [
    [],
    []
  ], [
    [0],
    ["Option A"]
  ]);

  wrapper.unmount();

};

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollChart, { lib: { rngInt: jest.fn(() => 0) } }));

//poll chart

describe("poll chart (form)", () => {

  const testSnapshot = initTestSnapshot(testForm);

  it("should match snapshot", () => testSnapshot());

  it("should call renderChart conditionally on update", () => testLoad(testFormMount, "form"));

});

describe("poll chart (view)", () => {

  const testSnapshot = initTestSnapshot(testView);

  it("should match snapshot", () => testSnapshot());

  it("should call renderChart conditionally on update", () => testLoad(testViewMount, "view"));

});
