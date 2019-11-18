"use strict";

//local imports

const PollIcon = require("../../../../../scripts/client/components/main/poll/poll-icon");

const { initTestPoll, initTestReload, testWrapper } = require("../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(PollIcon);

const testForm = initTestPoll(testShallow, "form");
const testView = initTestPoll(testShallow, "view");

const getView = ({ created = false, fill = "rgba(0, 0, 0, 0.75)", text = "", voted = false } = {}) => ({
  view: {
    created,
    fill,
    text,
    voted
  }
});

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollIcon));

//poll icon

describe("PollIcon (form)", () => {

  const testSnapshot = (view) => initTestSnapshot(testForm)(null, null, getView(view));

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (created)", () => testSnapshot({ created: true }));

  it("should match snapshot (voted)", () => testSnapshot({ voted: true }));

});

describe("PollIcon (form, events)", () => {

  it("should call handleRemove on click (remove)", () => {

    const event = { stopPropagation: jest.fn() };

    const testClick = initTestEvent(testForm, "click", event);

    return testClick(
      ".qa-click-remove",
      [null, null, getView({
        created: true,
        text: "Option A"
      })],
      ["formRemoveOption", ["Option A"]],
      () => {
        testMock(event.stopPropagation, []);
      }
    );

  });

});

describe("PollIcon (view)", () => {

  const testSnapshot = (view) => initTestSnapshot(testView)(null, null, getView(view));

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (created)", () => testSnapshot({ created: true }));

  it("should match snapshot (voted)", () => testSnapshot({ voted: true }));

});

describe("PollIcon (view, events)", () => {

  const testClick = (view, fn) => {

    const event = { stopPropagation: jest.fn() };

    const testReload = initTestReload("click", event);

    return testReload(
      testView,
      [null, { id: "id-b" }, getView(view)],
      ".qa-click-remove",
      "id-b",
      fn,
      () => {
        testMock(event.stopPropagation, []);
      }
    );

  };

  it("should call handleRemove on click (remove, created)", () => {

    const view = {
      created: true,
      text: "Option A"
    };

    return testClick(view, ["pollRemoveOption", ["id-b", "Option A"]]);

  });

  it("should call handleRemove on click (remove, voted)", () => {

    const view = { voted: true };

    return testClick(view, ["pollRemoveVote", ["id-b"]]);

  });

});
