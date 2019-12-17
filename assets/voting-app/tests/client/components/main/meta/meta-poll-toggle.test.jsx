"use strict";

//local imports

const MetaPollToggle = require("../../../../../scripts/client/components/main/meta/meta-poll-toggle");

const { newPoll } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { capitalize } = require("all/utilities");
const { newUser } = require("redux/schemas");
const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(MetaPollToggle);

const testRole = (render, role, prop, type = capitalize(role)) => {

  const testSnapshot = initTestSnapshot(render);

  const testClick = initTestEvent(render, "click");

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (toggled", () => testSnapshot({ user: newUser({ id: "id-a" }) }, {
    poll: {
      users: {
        [prop]: ["id-a"]
      }
    }
  }));

  it("should match snapshot (util)", () => testSnapshot(null, { util: "u-meta" }));

  it("should call handleClick on click", () => testClick(
    `.qa-toggle-${role}`,
    [null, { poll: { id: "id-a" } }],
    [`pollToggle${type}`, ["id-a"]]
  ));

};

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(MetaPollToggle));

//meta poll toggle

describe("MetaPollToggle (flag)", () => {

  const testFlag = withDataList(testShallow, [null, {
    poll: newPoll(),
    role: "flag"
  }]);

  testRole(testFlag, "flag", "flagged");

});

describe("MetaPollToggle (hide)", () => {

  const testHide = withDataList(testShallow, [null, {
    poll: newPoll(),
    role: "hide"
  }]);

  testRole(testHide, "hide", "hidden");

});
