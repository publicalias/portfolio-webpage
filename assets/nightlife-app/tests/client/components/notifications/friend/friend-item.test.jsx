"use strict";

//local imports

const FriendItem = require("../../../../../scripts/client/components/notifications/friend/friend-item");

const { newFriend, newUserWithData } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(FriendItem);

const getFriend = (confirmed = false) => newFriend({
  from: { id: "id-a" },
  to: { id: "id-b" },
  confirmed
});

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(FriendItem));

//friend item

describe("friend item (confirmed, from)", () => {

  const dataList = [{ user: newUserWithData({ id: "id-a" }) }, { friend: getFriend(true) }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { friend: { to: { name: "User B" } } }));

});

describe("friend item (confirmed, to)", () => {

  const dataList = [null, { friend: getFriend(true) }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { friend: { from: { name: "User A" } } }));

});

describe("friend item (unconfirmed, from)", () => {

  const dataList = [{ user: newUserWithData({ id: "id-a" }) }, { friend: getFriend() }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { friend: { to: { name: "User B" } } }));

});

describe("friend item (unconfirmed, to)", () => {

  const dataList = [null, { friend: getFriend() }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { friend: { from: { name: "User A" } } }));

});
