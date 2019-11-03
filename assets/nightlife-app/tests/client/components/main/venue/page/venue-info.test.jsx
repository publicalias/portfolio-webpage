"use strict";

//local imports

const VenueInfo = require("../../../../../../scripts/client/components/main/venue/page/venue-info");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueInfo);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueInfo));

//venue info

test("venue info should match snapshot", () => testSnapshot());
