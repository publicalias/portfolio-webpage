"use strict";

//local imports

const UserItem = require("../../../../../../scripts/client/components/main/user/list/user-item");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(UserItem);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserItem));

//user item

test("UserItem should match snapshot", () => testSnapshot());
