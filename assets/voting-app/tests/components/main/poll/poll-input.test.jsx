"use strict";

//local imports

const PollInput = require("../../../../scripts/components/main/poll/poll-input");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const { testShallow } = testWrapper(PollInput);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);

//poll input

test("poll input should match snapshot", () => testSnapshot());
