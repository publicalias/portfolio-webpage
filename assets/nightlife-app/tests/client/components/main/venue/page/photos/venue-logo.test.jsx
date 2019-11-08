"use strict";

//local imports

const VenueLogo = require("../../../../../../../scripts/client/components/main/venue/page/photos/venue-logo");

const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueLogo);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueLogo));

//venue logo

test("venue logo should match snapshot", () => testSnapshot());
