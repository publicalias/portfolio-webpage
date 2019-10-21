"use strict";

//local imports

const Item = require("../../../../../scripts/client/components/notifications/friend/item");

const { newFriend, newUserWithData } = require("../../../../../schemas");
const { testWrapper } = require("../../../test-helpers");

//global imports

const { initTestSnapshot, reactTests, withDataList } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(Item);

const getFriend = (confirmed = false) => newFriend({
  from: { id: "id-a" },
  to: { id: "id-b" },
  confirmed
});

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(Item));

//item

describe("item (confirmed, from)", () => {

  const dataList = [{ user: newUserWithData({ id: "id-a" }) }, { friend: getFriend(true) }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { friend: { to: { name: "User B" } } }));

});

describe("item (confirmed, to)", () => {

  const dataList = [null, { friend: getFriend(true) }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { friend: { from: { name: "User A" } } }));

});

describe("item (unconfirmed, from)", () => {

  const dataList = [{ user: newUserWithData({ id: "id-a" }) }, { friend: getFriend() }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { friend: { to: { name: "User B" } } }));

});

describe("item (unconfirmed, to)", () => {

  const dataList = [null, { friend: getFriend() }];

  const testSnapshot = withDataList(initTestSnapshot(testShallow), dataList);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { friend: { from: { name: "User A" } } }));

});
