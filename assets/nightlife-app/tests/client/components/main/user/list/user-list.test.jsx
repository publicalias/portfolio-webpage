"use strict";

//local imports

const UserList = require("../../../../../../scripts/client/components/main/user/list/user-list");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(UserList);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserList));

//user list

test("UserList should match snapshot", () => testSnapshot());
