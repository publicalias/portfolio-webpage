"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/friend-handlers");

const { newFriend, newUserData } = require("../../../../schemas");
const { initFriendsCol } = require("../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail, testInsert } = require("redux/tests/server-tests");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");
const userDataCol = () => db.collection("nightlife-app/user-data");

//setup

beforeAll(mongoTests.setup);
beforeEach(mongoTests.reset(friendsCol, userDataCol));
afterAll(mongoTests.teardown);

//friend add

describe("friendAdd", () => {

  const { friendAdd } = handlers;

  const mockAPICall = initMockAPICall(friendAdd, "POST");

  const getData = () => ({
    name: "User A",
    id: "id-a"
  });

  beforeEach(() => userDataCol().insertOne(newUserData({
    id: "id-a",
    data: { blocks: ["id-b"] }
  })));

  it("sends status if authentication fails", () => {

    const args = [mockAPICall, getData(), [newUser({ id: "id-b" })]];

    return testAuthFail(...args);

  });

  it("sends noop if successful", async () => {

    const res = await mockAPICall(
      newUser({
        name: "User C",
        id: "id-c"
      }),
      getData()
    );

    testMock(res.json, [{}]);

    await testInsert(friendsCol);

  });

});

//friend confirm

describe("friendConfirm", () => {

  const { friendConfirm } = handlers;

  const mockAPICall = initMockAPICall(friendConfirm, "PATCH");

  const getData = () => ({ id: "id-a" });

  beforeEach(initFriendsCol());

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData(), [newUser()]));

  it("sends noop if successful", async () => {

    const res = await mockAPICall(newUser({ id: "id-c" }), getData());

    testMock(res.json, [{}]);

  });

});

//friend dismiss

describe("friendDismiss", () => {

  const { friendDismiss } = handlers;

  const mockAPICall = initMockAPICall(friendDismiss, "PATCH");

  const getData = () => ({ id: "id-a" });

  const testDismiss = async (id) => {

    const res = await mockAPICall(newUser({ id }), getData());

    testMock(res.json, [{}]);

  };

  beforeEach(initFriendsCol(true));

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData(), [newUser()]));

  it("sends noop if successful (from)", () => testDismiss("id-b"));

  it("sends noop if successful (to)", () => testDismiss("id-c"));

});

//friend get list

describe("friendGetList", () => {

  const { friendGetList } = handlers;

  const mockAPICall = initMockAPICall(friendGetList, "GET");

  it("sends status if authentication fails", () => testAuthFail(mockAPICall));

  it("sends data if successful", async () => {

    const friends = [
      newFriend({
        date: 0,
        from: { id: "id-a" }
      }),
      newFriend({
        date: 1,
        to: { id: "id-a" }
      }),
      newFriend({
        date: 2,
        from: { id: "id-a" },
        hidden: ["id-a"]
      })
    ];

    await friendsCol().insertMany(friends);

    const res = await mockAPICall(newUser({ id: "id-a" }));

    testMock(res.json, [{ notifications: { friends: friends.slice(0, 2).reverse() } }]);

  });

});

//friend remove

describe("friendRemove", () => {

  const { friendRemove } = handlers;

  const mockAPICall = initMockAPICall(friendRemove, "DELETE");

  const getData = () => ({ id: "id-a" });

  beforeEach(initFriendsCol());

  const testRemove = async (id) => {

    const res = await mockAPICall(newUser({ id }), getData());

    testMock(res.json, [{}]);

  };

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData(), [newUser()]));

  it("sends noop if successful (from)", () => testRemove("id-b"));

  it("sends noop if successful (to)", () => testRemove("id-c"));

});
