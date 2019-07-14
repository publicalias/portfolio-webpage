"use strict";

//local imports

const PollChart = require("../../../../scripts/components/main/poll/poll-chart");

const { initTestPoll, testWrapper } = require("../../../test-helpers");

//global imports

const { newOption } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(PollChart);

const testSnapshot = initTestSnapshot(testShallow);

const testLoad = (render, role) => {

  const { lib: { renderChart, rngInt } } = PollChart.injected;

  const { wrapper } = render();

  wrapper.mount();

  wrapper.setProps({
    local: {
      poll: { options: [role === "form" ? "Option A" : newOption()] },
      role
    }
  });

  if (role === "form") {
    testMock(rngInt, [0, 9, true]);
  }

  testMock(renderChart, [
    []
  ], [
    [0]
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

  it("should call renderChart on load and poll.options", () => testLoad(testFormMount, "form"));

});

describe("poll chart (view)", () => {

  const testView = initTestPoll(testSnapshot, "view");
  const testViewMount = initTestPoll(testMount, "view");

  it("should match snapshot", () => testView());

  it("should call renderChart on load and poll.options", () => testLoad(testViewMount, "view"));

});
