"use strict";

//local imports

const PollChart = require("../../../../scripts/components/main/poll/poll-chart");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { newForm, newOption, newPoll } = require("schemas/voting-app");
const { testMock } = require("test-helpers/meta-tests");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//poll chart

describe("poll chart", () => {

  const { testShallow } = testWrapper(PollChart);

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (form)", () => testSnapshot(null, {
    poll: newForm(),
    role: "form"
  }));

  it("should match snapshot (view)", () => testSnapshot(null, {
    poll: newPoll(),
    role: "view"
  }));

});

describe("poll chart (load and poll.options)", () => {

  const { testMount } = testWrapper(PollChart);

  const testLoad = (role) => {

    const { renderChart, rngInt } = Object.assign(PollChart.injected, {
      renderChart: jest.fn(),
      rngInt: jest.fn(() => 0)
    });

    const { wrapper } = testMount(null, {
      poll: role === "form" ? newForm() : newPoll(),
      role
    });

    wrapper.mount();

    wrapper.setProps({
      local: {
        poll: { options: [role === "form" ? "Option A" : newOption("Option A")] },
        role
      }
    });

    testMock(renderChart, [
      []
    ], [
      [0]
    ]);

    if (role === "form") {
      testMock(rngInt, [0, 9, true]);
    }

    wrapper.unmount();

  };

  it("should call renderChart (form)", () => testLoad("form"));

  it("should call renderChart (view)", () => testLoad("view"));

});
