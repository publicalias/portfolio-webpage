"use strict";

//local imports

const VenueFavorite = require("../../../../../../../scripts/client/components/main/venue/page/controls/venue-favorite");

const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueFavorite);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueFavorite));

//venue favorite

test("venue favorite should match snapshot", () => testSnapshot());
