"use strict";

//local imports

const FriendList = require("../../../../../scripts/client/components/notifications/friend/friend-list");

const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(FriendList);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(FriendList));

//friend list

describe("friend list", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (bool)", () => testSnapshot({ users: { data: [{}] } }));

  it("should match snapshot (list)", () => testSnapshot({ notifications: { friends: [{}] } }));

});
