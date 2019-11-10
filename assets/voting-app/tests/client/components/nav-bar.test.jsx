"use strict";

//local imports

const NavBar = require("../../../scripts/client/components/nav-bar");

const { testWrapper } = require("../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(NavBar);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(NavBar));

//nav bar

describe("nav bar", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

});
