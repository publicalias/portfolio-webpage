"use strict";

//local imports

const UserBody = require("../../../../../../scripts/client/components/main/user/list/user-body");

const { testWrapper } = require("../../../../test-helpers");

//global imports

const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(UserBody);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserBody));

//user body

describe("UserBody", () => {

  const testSnapshot = withDataList(initTestSnapshot(testShallow), [null, { handleScroll: jest.fn() }]);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (list)", () => testSnapshot({ users: { data: [{}] } }));

});
