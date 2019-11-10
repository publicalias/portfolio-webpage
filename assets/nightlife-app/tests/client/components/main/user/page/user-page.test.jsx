"use strict";

//local imports

const UserPage = require("../../../../../../scripts/client/components/main/user/page/user-page");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(UserPage);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserPage));

//user page

test("UserPage should match snapshot", () => testSnapshot());
