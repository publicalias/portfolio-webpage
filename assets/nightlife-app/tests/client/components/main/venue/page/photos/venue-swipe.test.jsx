"use strict";

//local imports

const VenueSwipe = require("../../../../../../../scripts/client/components/main/venue/page/photos/venue-swipe");

const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueSwipe);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueSwipe));

//venue swipe

test("venue swipe should match snapshot", () => testSnapshot());
