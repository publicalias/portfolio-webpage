"use strict";

//local imports

const UserMenu = require("../../../../../../scripts/client/components/main/user/list/user-menu");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(UserMenu);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserMenu));

//user menu

test("UserMenu should match snapshot", () => testSnapshot());
