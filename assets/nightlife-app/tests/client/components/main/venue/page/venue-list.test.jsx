"use strict";

//local imports

const VenueList = require("../../../../../../scripts/client/components/main/venue/page/venue-list");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueList);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueList));

//venue list

test("VenueList should match snapshot", () => testSnapshot());
