"use strict";

//local imports

const VenueImage = require("../../../../../../../scripts/client/components/main/venue/page/photos/venue-image");

const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueImage);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueImage));

//venue image

test("venue image should match snapshot", () => testSnapshot());
