"use strict";

//local imports

const UserMenu = require("../../../../../../scripts/client/components/main/user/list/user-menu");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(UserMenu);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserMenu));

//user menu

describe("UserMenu", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (search)", () => testSnapshot({ users: { list: { menu: { search: "User A" } } } }));

});
