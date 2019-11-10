"use strict";

//local imports

const Sidebar = require("../../../scripts/client/components/sidebar");

const { testWrapper } = require("../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(Sidebar);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(Sidebar));

//sidebar

describe("Sidebar", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot({ user: newUser({ name: "User A" }) }));

});
