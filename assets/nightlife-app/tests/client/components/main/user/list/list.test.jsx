"use strict";

//local imports

const List = require("../../../../../../scripts/client/components/main/user/list/list");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(List);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(List));

//list

test("list should match snapshot", () => testSnapshot());
