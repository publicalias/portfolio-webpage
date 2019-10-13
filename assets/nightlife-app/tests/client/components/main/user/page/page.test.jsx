"use strict";

//local imports

const Page = require("../../../../../../scripts/client/components/main/user/page/page");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(Page);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(Page));

//page

test("page should match snapshot", () => testSnapshot());
