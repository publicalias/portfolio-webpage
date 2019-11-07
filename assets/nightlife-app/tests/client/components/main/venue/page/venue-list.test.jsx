"use strict";

//local imports

const VenueList = require("../../../../../../scripts/client/components/main/venue/page/venue-list");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueList);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueList));

//venue list

test("venue list should match snapshot", () => testSnapshot());