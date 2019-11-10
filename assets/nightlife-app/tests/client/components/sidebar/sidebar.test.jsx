"use strict";

//local imports

const Sidebar = require("../../../../scripts/client/components/sidebar/sidebar");

const { newUserWithData } = require("../../../../schemas");
const { testWrapper } = require("../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(Sidebar);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(Sidebar));

//sidebar

describe("Sidebar", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  const testClick = initTestEvent(testShallow, "click");

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUserWithData() }));

  it("should match snapshot (name)", () => testSnapshot({ user: newUserWithData({ name: "User A" }) }));

  it("should match snapshot (settings)", () => testSnapshot({
    user: newUserWithData(),
    account: { settings: true }
  }));

  it("should call handleClick on click", () => testClick(
    ".qa-toggle-settings",
    [{ user: newUserWithData() }],
    ["metaToggleSettings", []]
  ));

});
