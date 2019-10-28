"use strict";

//local imports

const VenueBody = require("../../../../../../scripts/client/components/main/venue/list/venue-body");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueBody);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueBody));

//venue body

test("venue body should match snapshot", () => testSnapshot());
