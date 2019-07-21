"use strict";

//local imports

const PollToggle = require("../../../../../scripts/client/components/main/poll/poll-toggle");

const { initTestPoll, testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(PollToggle);

const testSnapshot = initTestSnapshot(testShallow);

const initTestProp = (render) => (prop) => render({ user: newUser({ id: "id-a" }) }, prop && {
  users: {
    [prop]: ["id-a"]
  }
});

const initTestToggle = (render) => (qa, type, list) => {

  const dataList = [null, { id: "id-a" }, list];

  return testReload(render, dataList, qa, list ? null : "id-a", [type, ["id-a"]]);

};

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollToggle));

//poll toggle

describe("poll toggle (flag)", () => {

  const testFlag = initTestPoll(testSnapshot, "flag");
  const testFlagMount = initTestPoll(testMount, "flag");

  const testProp = initTestProp(testFlag);
  const testToggle = initTestToggle(testFlagMount);

  it("should match snapshot (default)", () => testProp());

  it("should match snapshot (toggled)", () => testProp("flagged"));

  it("should call pollToggleFlag on click (list)", () => testToggle(".qa-toggle-flag", "pollToggleFlag", true));

  it("should call pollToggleFlag on click (view)", () => testToggle(".qa-toggle-flag", "pollToggleFlag"));

});

describe("poll toggle (hide)", () => {

  const testHide = initTestPoll(testSnapshot, "hide");
  const testHideMount = initTestPoll(testMount, "hide");

  const testProp = initTestProp(testHide);
  const testToggle = initTestToggle(testHideMount);

  it("should match snapshot (default)", () => testProp());

  it("should match snapshot (toggled)", () => testProp("hidden"));

  it("should call pollToggleHide on click (list)", () => testToggle(".qa-toggle-hide", "pollToggleHide", true));

  it("should call pollToggleHide on click (view)", () => testToggle(".qa-toggle-hide", "pollToggleHide"));

});
