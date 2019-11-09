"use strict";

//local imports

const VenueRSVP = require("../../../../../../../scripts/client/components/main/venue/page/controls/venue-rsvp");

const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueRSVP);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueRSVP));

//venue rsvp

test("venue rsvp should match snapshot", () => testSnapshot());
