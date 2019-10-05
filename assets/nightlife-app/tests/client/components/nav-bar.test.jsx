"use strict";

//local imports

const NavBar = require("../../../scripts/client/components/nav-bar");

const { testWrapper } = require("../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(NavBar);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(NavBar));

//nav bar

test("nav bar should match snapshot", () => testSnapshot());
