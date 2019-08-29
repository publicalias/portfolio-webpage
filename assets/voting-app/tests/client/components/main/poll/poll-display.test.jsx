"use strict";

//local imports

const PollDisplay = require("../../../../../scripts/client/components/main/poll/poll-display");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(PollDisplay);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(PollDisplay));

//poll display

test("poll display should match snapshot", () => testSnapshot());
