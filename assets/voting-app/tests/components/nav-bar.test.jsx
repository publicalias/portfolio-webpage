"use strict";

//local imports

const NavBar = require("../../scripts/components/nav-bar");

const { testWrapper } = require("../test-helpers");

//global imports

const { newUser } = require("schemas/master");
const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(NavBar));

//nav bar

describe("nav bar", () => {

  const { testShallow } = testWrapper(NavBar);

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (authenticated)", () => testSnapshot({ user: newUser() }));

});
