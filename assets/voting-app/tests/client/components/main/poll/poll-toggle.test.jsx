"use strict";

//local imports

const PollToggle = require("../../../../../scripts/client/components/main/poll/poll-toggle");

const { initTestPoll, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestEvent, initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(PollToggle);

const testFlag = initTestPoll(testShallow, "flag");
const testHide = initTestPoll(testShallow, "hide");

const initTestBool = (render) => (prop) => render({ user: newUser({ id: "id-a" }) }, prop && {
  users: {
    [prop]: ["id-a"]
  }
});

const initTestClick = (render) => (qa, type, list) => initTestEvent(render, "click")(
  qa,
  [null, { id: "id-a" }, { list }],
  [type, ["id-a"]]
);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollToggle));

//poll toggle

describe("PollToggle (flag)", () => {

  const testSnapshot = initTestSnapshot(testFlag);
  const testBool = initTestBool(testSnapshot);

  const testClick = initTestClick(testFlag);

  it("should match snapshot (default)", () => testBool());

  it("should match snapshot (toggled)", () => testBool("flagged"));

  it("should match snapshot (util)", () => testSnapshot(null, null, { util: "u-whatever" }));

  it("should call handleClick on click (list)", () => testClick(".qa-toggle-flag", "pollToggleFlag", true));

  it("should call handleClick on click (view)", () => testClick(".qa-toggle-flag", "pollToggleFlag"));

});

describe("PollToggle (hide)", () => {

  const testSnapshot = initTestSnapshot(testHide);
  const testBool = initTestBool(testSnapshot);

  const testClick = initTestClick(testHide);

  it("should match snapshot (default)", () => testBool());

  it("should match snapshot (toggled)", () => testBool("hidden"));

  it("should match snapshot (util)", () => testSnapshot(null, null, { util: "u-whatever" }));

  it("should call handleClick on click (list)", () => testClick(".qa-toggle-hide", "pollToggleHide", true));

  it("should call handleClick on click (view)", () => testClick(".qa-toggle-hide", "pollToggleHide"));

});
