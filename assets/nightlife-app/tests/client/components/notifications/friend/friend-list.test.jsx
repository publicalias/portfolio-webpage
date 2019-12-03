"use strict";

//local imports

const FriendList = require("../../../../../scripts/client/components/notifications/friend/friend-list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, testMockHook } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testMount, testShallow } = testWrapper(FriendList);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(FriendList));

//friend list

describe("FriendList", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (bool)", () => testSnapshot({ users: { data: [{}] } }));

  it("should match snapshot (list)", () => testSnapshot({ notifications: { friends: [{}] } }));

  it("should call useRefresh on update", () => testMockHook(FriendList, testMount, "useRefresh"));

});
