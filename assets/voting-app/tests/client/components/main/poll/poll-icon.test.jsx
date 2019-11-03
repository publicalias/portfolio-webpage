"use strict";

//local imports

const PollIcon = require("../../../../../scripts/client/components/main/poll/poll-icon");

const { initTestPoll, initTestReload, testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests } = require("redux/tests/react-tests");

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

describe("poll icon (form)", () => {

  const testSnapshot = (view) => initTestSnapshot(testForm)(null, null, getView(view));

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (created)", () => testSnapshot({ created: true }));

  it("should match snapshot (voted)", () => testSnapshot({ voted: true }));

});

describe("poll icon (form, events)", () => {

  it("should call formRemoveOption on click (remove)", () => {

    const dataList = [null, null, getView({
      created: true,
      text: "Option A"
    })];

    const event = { stopPropagation: jest.fn() };

    const testClick = initTestEvent(testForm, "click", event);

    const fnList = [
      ["formRemoveOption", ["Option A"]],
      () => {
        testMock(event.stopPropagation, []);
      }
    ];

    return testClick(".qa-option-remove", dataList, ...fnList);

  });

});

describe("poll icon (view)", () => {

  const testSnapshot = (view) => initTestSnapshot(testView)(null, null, getView(view));

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (created)", () => testSnapshot({ created: true }));

  it("should match snapshot (voted)", () => testSnapshot({ voted: true }));

});

describe("poll icon (view, events)", () => {

  const testClick = (view, fn) => {

    const dataList = [null, { id: "id-b" }, getView(view)];

    const event = { stopPropagation: jest.fn() };

    const testReload = initTestReload("click", event);

    const fnList = [fn, () => {
      testMock(event.stopPropagation, []);
    }];

    return testReload(testView, dataList, ".qa-option-remove", "id-b", ...fnList);

  };

  it("should call pollRemoveOption on click (remove, created)", () => {

    const view = {
      created: true,
      text: "Option A"
    };

    return testClick(view, ["pollRemoveOption", ["id-b", "Option A"]]);

  });

  it("should call pollRemoveVote on click (remove, voted)", () => {

    const view = { voted: true };

    return testClick(view, ["pollRemoveVote", ["id-b"]]);

  });

});
