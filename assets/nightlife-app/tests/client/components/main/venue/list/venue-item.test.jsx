"use strict";

//local imports

const VenueItem = require("../../../../../../scripts/client/components/main/venue/list/venue-item");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueItem);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueItem));

//venue item

test("venue item should match snapshot", () => testSnapshot());
