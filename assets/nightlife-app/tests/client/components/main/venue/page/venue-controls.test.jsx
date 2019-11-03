"use strict";

//local imports

const VenueControls = require("../../../../../../scripts/client/components/main/venue/page/venue-controls");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueControls);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueControls));

//venue controls

test("venue controls should match snapshot", () => testSnapshot());
