"use strict";

//local imports

const UserControls = require("../../../../../../scripts/client/components/main/user/page/user-controls");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(UserControls);

const testSnapshot = initTestSnapshot(testShallow);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserControls));

//user controls

test("user controls should match snapshot", () => testSnapshot());
