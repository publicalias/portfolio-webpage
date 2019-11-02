"use strict";

//local imports

const PollChart = require("../../../../../scripts/client/components/main/poll/poll-chart");

const { newOption } = require("../../../../../schemas");
const { initTestPoll, testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestSnapshot, reactTests, setProps } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(PollChart);

const testSnapshot = initTestSnapshot(testShallow);

const testLoad = (render, role) => {

  const { lib: { renderChart, rngInt } } = PollChart.injected;

  const { wrapper } = render(null, { options: [] });

  wrapper.mount();

  setProps(wrapper, null, { poll: { options: [role === "form" ? "Option A" : newOption({ text: "Option A" })] } });

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

  const testForm = initTestPoll(testSnapshot, "form");
  const testFormMount = initTestPoll(testMount, "form");

  it("should match snapshot", () => testForm());

  it("should call renderChart conditionally on update", () => testLoad(testFormMount, "form"));

});

describe("poll chart (view)", () => {

  const testView = initTestPoll(testSnapshot, "view");
  const testViewMount = initTestPoll(testMount, "view");

  it("should match snapshot", () => testView());

  it("should call renderChart conditionally on update", () => testLoad(testViewMount, "view"));

});
