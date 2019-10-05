"use strict";

//local imports

const UI = require("../../../scripts/client/components/ui");

const { testWrapper } = require("../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(UI);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UI));

//ui

test("ui should match snapshot", () => testSnapshot());
