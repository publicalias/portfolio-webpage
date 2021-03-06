"use strict";

//local imports

const VenueControls = require("../../../../../../../scripts/client/components/main/venue/page/controls/venue-controls");

const { newVenue } = require("../../../../../../../schemas");
const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueControls);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueControls));

//venue controls

test("VenueControls should match snapshot", () => testSnapshot(null, {
  refresh: jest.fn(),
  venue: newVenue()
}));
