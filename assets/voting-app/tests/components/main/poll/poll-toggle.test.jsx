"use strict";

/*eslint max-statements: 0*/

//local imports

const PollToggle = require("../../../../scripts/components/main/poll/poll-toggle");

const { testReload, testWrapper } = require("../../../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { newPoll } = require("schemas/voting-app");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);

//poll toggle

describe("poll toggle", () => {

  const { testMount, testShallow } = testWrapper(PollToggle);

  const testSnapshot = initTestSnapshot(testShallow);

  const testRole = (role, prop) => testSnapshot({ user: newUser({ id: "id-a" }) }, {
    poll: newPoll(prop && {
      users: {
        [prop]: ["id-a"]
      }
    }),
    role
  });

  const testToggle = (role, qa, type, list) => {

    const { props, wrapper } = testMount({}, {
      list,
      poll: newPoll({ id: "id-a" }),
      role
    });

    return testReload(props, wrapper, qa, type, ["id-a"], list);

  };

  it("should match snapshot (default)", () => testSnapshot({}, { poll: newPoll() }));

  it("should match snapshot (flag)", () => testRole("flag"));

  it("should match snapshot (flag, true)", () => testRole("flag", "flagged"));

  it("should match snapshot (hide)", () => testRole("hide"));

  it("should match snapshot (hide, true)", () => testRole("hide", "hidden"));

  it("should call pollToggleFlag on click (list)", () => testToggle("flag", ".qa-toggle-flag", "pollToggleFlag", true));

  it("should call pollToggleFlag on click (id)", () => testToggle("flag", ".qa-toggle-flag", "pollToggleFlag"));

  it("should call pollToggleHide on click (list)", () => testToggle("hide", ".qa-toggle-hide", "pollToggleHide", true));

  it("should call pollToggleHide on click (id)", () => testToggle("hide", ".qa-toggle-hide", "pollToggleHide"));

});
