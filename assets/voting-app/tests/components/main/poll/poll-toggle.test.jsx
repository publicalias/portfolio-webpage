"use strict";

//local imports

const PollToggle = require("../../../../scripts/components/main/poll/poll-toggle");

const { testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(PollToggle);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollToggle));

//poll toggle

describe("poll toggle", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  const testRole = (role, prop) => testSnapshot({ user: newUser({ id: "id-a" }) }, {
    poll: newPoll(prop && {
      users: {
        [prop]: ["id-a"]
      }
    }),
    role
  });

  it("should match snapshot (default)", () => testSnapshot(null, { poll: newPoll() }));

  it("should match snapshot (flag)", () => testRole("flag"));

  it("should match snapshot (flag, true)", () => testRole("flag", "flagged"));

  it("should match snapshot (hide)", () => testRole("hide"));

  it("should match snapshot (hide, true)", () => testRole("hide", "hidden"));

});

describe("poll toggle (click)", () => {

  const testToggle = (role, qa, type, list) => {

    const dataList = [null, {
      list,
      poll: newPoll({ id: "id-a" }),
      role
    }];

    return testReload(testMount, dataList, qa, list ? null : "id-a", [type, ["id-a"]]);

  };

  it("should call pollToggleFlag on click (list)", () => testToggle("flag", ".qa-toggle-flag", "pollToggleFlag", true));

  it("should call pollToggleFlag on click (id)", () => testToggle("flag", ".qa-toggle-flag", "pollToggleFlag"));

  it("should call pollToggleHide on click (list)", () => testToggle("hide", ".qa-toggle-hide", "pollToggleHide", true));

  it("should call pollToggleHide on click (id)", () => testToggle("hide", ".qa-toggle-hide", "pollToggleHide"));

});
