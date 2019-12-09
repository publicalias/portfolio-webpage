"use strict";

//local imports

const FriendItem = require("../../../../../scripts/client/components/notifications/friend/friend-item");

const { newFriend, newUserWithData } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(FriendItem);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(FriendItem));

//friend item

describe("FriendItem", () => {

  const testSnapshot = initTestSnapshot(testShallow);

  const getFriend = (confirmed = false) => newFriend({
    from: { id: "id-a" },
    to: { id: "id-b" },
    confirmed
  });

  it("should match snapshot (from, confirmed)", () => {

    const dataList = [{ user: newUserWithData({ id: "id-a" }) }, { friend: getFriend(true) }];

    testSnapshot(...dataList);

  });

  it("should match snapshot (from, unconfirmed)", () => {

    const dataList = [{ user: newUserWithData({ id: "id-a" }) }, { friend: getFriend() }];

    testSnapshot(...dataList);

  });

  it("should match snapshot (to, confirmed)", () => testSnapshot(null, { friend: getFriend(true) }));

  it("should match snapshot (to, unconfirmed)", () => testSnapshot(null, { friend: getFriend() }));

});
