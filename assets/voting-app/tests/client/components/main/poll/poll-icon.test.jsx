"use strict";

//local imports

const PollIcon = require("../../../../../scripts/client/components/main/poll/poll-icon");

const { initTestPoll, initTestReload, testWrapper } = require("../../../test-helpers");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { initTestEvent, initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(PollIcon);

const testSnapshot = initTestSnapshot(testShallow);

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

  const testForm = (view) => initTestPoll(testSnapshot, "form")(null, null, getView(view));

  it("should match snapshot (default)", () => testForm());

  it("should match snapshot (created)", () => testForm({ created: true }));

  it("should match snapshot (voted)", () => testForm({ voted: true }));

});

describe("poll icon (form, events)", () => {

  const testFormMount = initTestPoll(testMount, "form");

  const testClick = initTestEvent(testFormMount, "click");

  it("should call formRemoveOption on click (remove)", () => {

    const dataList = [null, null, getView({
      created: true,
      text: "Option A"
    })];

    return testClick(".qa-option-remove", dataList, ["formRemoveOption", ["Option A"]]);

  });

});

describe("poll icon (view)", () => {

  const testView = (view) => initTestPoll(testSnapshot, "view")(null, null, getView(view));

  it("should match snapshot (default)", () => testView());

  it("should match snapshot (created)", () => testView({ created: true }));

  it("should match snapshot (voted)", () => testView({ voted: true }));

});

describe("poll icon (view, events)", () => {

  const testViewMount = initTestPoll(testMount, "view");

  const testRemove = (view, fn) => {

    const event = { stopPropagation: jest.fn() };
    const testReload = initTestReload("click", event);

    const dataList = [null, { id: "id-b" }, getView(view)];
    const fnList = [fn, () => {
      testMock(event.stopPropagation, []);
    }];

    return testReload(testViewMount, dataList, ".qa-option-remove", "id-b", ...fnList);

  };

  it("should call pollRemoveOption on click (remove, created)", () => {

    const view = {
      created: true,
      text: "Option A"
    };

    return testRemove(view, ["pollRemoveOption", ["id-b", "Option A"]]);

  });

  it("should call pollRemoveVote on click (remove, voted)", () => {

    const view = { voted: true };

    return testRemove(view, ["pollRemoveVote", ["id-b"]]);

  });

});
