"use strict";

//local imports

const VenuePhotos = require("../../../../../../scripts/client/components/main/venue/page/venue-photos");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenuePhotos);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenuePhotos));

//venue photos

test("venue photos should match snapshot", () => testSnapshot());
