"use strict";

//local imports

const VenuePage = require("../../../../../../scripts/client/components/main/venue/page/venue-page");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenuePage);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenuePage));

//venue page

test("venue page should match snapshot", () => testSnapshot());
