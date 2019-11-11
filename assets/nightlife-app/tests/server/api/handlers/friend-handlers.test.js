"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/friend-handlers");

const { newFriend, newUserData } = require("../../../../schemas");

//global imports

const { newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail, testInsert } = require("redux/tests/server-tests");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");
const userDataCol = () => db.collection("nightlife-app/user-data");

const insertRequest = () => friendsCol().insertOne(newFriend({
  id: "id-a",
  from: { id: "id-b" },
  to: { id: "id-c" }
}));

//setup

beforeAll(mongoTests.setup);
beforeEach(mongoTests.reset(friendsCol, userDataCol));
afterAll(mongoTests.teardown);

//friend add

describe("friendAdd", () => {

  const { friendAdd } = handlers;

  const mockAPICall = initMockAPICall(friendAdd, "POST");

  const getData = (id = "id-a") => ({
    name: "User A",
    id
  });

  const testError = async (from, to) => {

    await friendsCol().insertOne(newFriend({
      from: { id: from },
      to: { id: to }
    }));

    const res = await mockAPICall(newUser({ id: "id-c" }), getData());

    testMock(res.json, [{ errors: ["Friend request already exists"] }]);

  };

  beforeEach(() => userDataCol().insertOne(newUserData({
    id: "id-a",
    data: { blocks: ["id-b"] }
  })));

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData(), [newUser({ id: "id-b" })]));

  it("sends errors if user does not exist", async () => {

    const res = await mockAPICall(newUser(), getData(""));

    testMock(res.json, [{ errors: ["User does not exist"] }]);

  });

  it("sends errors if friend request already exists (from)", () => testError("id-a", "id-c"));

  it("sends errors if friend request already exists (to)", () => testError("id-c", "id-a"));

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

  beforeEach(insertRequest);

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

  beforeEach(insertRequest);

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
      newFriend({ from: { id: "id-a" } }),
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

  beforeEach(insertRequest);

  const testRemove = async (id) => {

    const res = await mockAPICall(newUser({ id }), getData());

    testMock(res.json, [{}]);

    expect(await friendsCol().countDocuments()).toEqual(0);

  };

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData(), [newUser()]));

  it("sends noop if successful (from)", () => testRemove("id-b"));

  it("sends noop if successful (to)", () => testRemove("id-c"));

});
