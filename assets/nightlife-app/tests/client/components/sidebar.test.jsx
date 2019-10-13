"use strict";

//local imports

const Sidebar = require("../../../scripts/client/components/sidebar");

const { testWrapper } = require("../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(Sidebar);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(Sidebar));

//sidebar

test("sidebar should match snapshot", () => testSnapshot());
