"use strict";

//local imports

const PollList = require("../../../../scripts/components/main/poll/poll-list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("test-helpers/react-tests");

//utilities

const { testShallow } = testWrapper(PollList);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);

//poll list

test("poll list should match snapshot", () => testSnapshot());
