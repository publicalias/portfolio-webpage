"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/user-handlers");

const { newFriend, newListParamsUsers, newUserData } = require("../../../../schemas");
const { getGeoPoint, initTestUserItem, insertFriend, testSearch } = require("../../test-helpers");

//global imports

const { roundTo } = require("all/utilities");
const { newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail } = require("redux/tests/server-tests");

//utilities

const favoritesCol = () => db.collection("nightlife-app/favorites");
const friendsCol = () => db.collection("nightlife-app/friends");
const userDataCol = () => db.collection("nightlife-app/user-data");

//setup

beforeAll(mongoTests.setup);
beforeEach(mongoTests.reset(favoritesCol, friendsCol, userDataCol));
afterAll(mongoTests.teardown);

//user get item

describe("userGetItem (no data)", () => {

  const { userGetItem } = handlers;

  const mockAPICall = initMockAPICall(userGetItem, "GET");

  const getData = (location = getGeoPoint(0.05)) => ({
    id: "id-a",
    location
  });

  const testGetItem = async (data, location) => {

    if (data) {
      await userDataCol().insertOne(newUserData(data));
    }

    const res = await mockAPICall({}, getData(location));

    testMock(res.json, [{ users: { data: [] } }]);

  };

  it("sends data if successful (id exists, no location, user)", () => testGetItem({
    id: "id-a",
    data: { location: getGeoPoint(0) }
  }, null));

  it("sends data if successful (id exists, no location, item)", () => testGetItem({ id: "id-a" }));

  it("sends data if successful (id does not exist)", () => testGetItem());

});

describe("userGetItem (data)", () => {

  const { userGetItem } = handlers;

  const mockAPICall = initMockAPICall(userGetItem, "GET");

  const getData = () => ({
    id: "id-a",
    location: getGeoPoint(0.05)
  });

  const testGetItem = initTestUserItem(mockAPICall, getData, () => ({ distance: 4.9 }));

  it("sends data if successful (id exists, no user)", () => testGetItem());

  it("sends data if successful (id exists, no relation)", () => testGetItem("id-b"));

  it("sends data if successful (id exists, unconfirmed)", async () => {

    await friendsCol().insertOne(newFriend({
      from: { id: "id-b" },
      to: { id: "id-a" }
    }));

    await testGetItem("id-b");

  });

});

describe("userGetItem (data, friends)", () => {

  const { userGetItem } = handlers;

  const mockAPICall = initMockAPICall(userGetItem, "GET");

  const getData = () => ({
    id: "id-a",
    location: getGeoPoint(0.05)
  });

  const testGetItem = initTestUserItem(mockAPICall, getData, async () => ({
    distance: 4.9,
    favorites: await favoritesCol()
      .find()
      .toArray(),
    friends: await friendsCol()
      .find()
      .toArray()
  }));

  it("sends data if successful (id exists, self)", () => testGetItem("id-a"));

  it("sends data if successful (id exists, friends, from)", async () => {

    await insertFriend("id-b", "id-a");

    await testGetItem("id-b");

  });

  it("sends data if successful (id exists, friends, to)", async () => {

    await insertFriend("id-a", "id-b");

    await testGetItem("id-b");

  });

});

//user get list

describe("userGetList (no data)", () => {

  const { userGetList } = handlers;

  const mockAPICall = initMockAPICall(userGetList, "GET");

  const getData = (params, location = getGeoPoint(0)) => ({
    params: newListParamsUsers(params),
    length: 0,
    location
  });

  const testGetList = async (...args) => {

    const res = await mockAPICall({}, getData(...args));

    testMock(res.json, [{ users: { data: [] } }]);

  };

  beforeEach(() => userDataCol().insertOne(newUserData({ data: { location: getGeoPoint(0) } })));

  testSearch(async (error, params) => {

    const res = await mockAPICall({}, getData(params));

    testMock(res.json, [{ errors: [error] }]);

  });

  it("sends data if successful (no location, user)", () => testGetList(null, null));

  it("sends data if successful (no location, item)", async () => {

    await userDataCol().updateOne({}, { $set: { "data.location": null } });

    await testGetList();

  });

});

describe("userGetList (data, length)", () => {

  const { userGetList } = handlers;

  const mockAPICall = initMockAPICall(userGetList, "GET");

  const getData = (length) => ({
    params: newListParamsUsers(),
    length,
    location: getGeoPoint(0)
  });

  const testGetList = async (length) => {

    const users = Array(1 + 50)
      .fill({ data: { location: getGeoPoint(0) } })
      .map(newUserData);

    await userDataCol().insertMany(users);

    const res = await mockAPICall({}, getData(length));

    testMock(res.json, [{ users: { data: Array(length).concat(users.slice(length, length + 50)) } }]);

  };

  it("sends data if successful (length, 0)", () => testGetList(0));

  it("sends data if successful (length, 1)", () => testGetList(1));

});

describe("userGetList (data, params)", () => {

  const { userGetList } = handlers;

  const mockAPICall = initMockAPICall(userGetList, "GET");

  const getData = (params) => ({
    params: newListParamsUsers(params),
    length: 0,
    location: getGeoPoint(0)
  });

  const testGetList = async (users, params, fn) => {

    await userDataCol().insertMany(users);

    const res = await mockAPICall({}, getData(params));

    testMock(res.json, [{ users: { data: fn(users) } }]);

  };

  it("sends data if successful (range)", () => {

    const seeds = Array(6).fill([0.05, 4.9]);

    const users = seeds.map(([coor, dist], i) => newUserData({
      data: {
        distance: roundTo(dist * (i + 1), 1),
        location: getGeoPoint(roundTo(coor * (i + 1), 2))
      }
    }));

    return testGetList(users, { range: 25 }, (users) => users.slice(0, 5).reverse());

  });

  it("sends data if successful (search)", () => {

    const seeds = ["User A", "User A", "User B"];

    const users = seeds.map((e) => newUserData({
      name: e,
      data: { location: getGeoPoint(0) }
    }));

    return testGetList(users, { search: "User A" }, (users) => users.slice(0, 2));

  });

});

//user toggle block

describe("userToggleBlock", () => {

  const { userToggleBlock } = handlers;

  const mockAPICall = initMockAPICall(userToggleBlock, "PATCH");

  const getData = (id = "id-b") => ({ id });

  const testAdd = async (from, to) => {

    await Promise.all([
      insertFriend(from, to),
      userDataCol().insertOne(newUserData({ id: "id-a" }))
    ]);

    const res = await mockAPICall(newUser({ id: "id-a" }), getData());

    const update = await userDataCol().findOne();

    testMock(res.json, [{}]);

    expect(update.data.blocks).toEqual(["id-b"]);

    expect(await friendsCol().countDocuments()).toEqual(0);

  };

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData()));

  it("sends errors if user does not exist", async () => {

    const res = await mockAPICall(newUser(), getData(""));

    testMock(res.json, [{ errors: ["User does not exist"] }]);

  });

  it("sends noop if successful (add, from)", () => testAdd("id-a", "id-b"));

  it("sends noop if successful (add, to)", () => testAdd("id-b", "id-a"));

  it("sends noop if successful (remove)", async () => {

    await userDataCol().insertOne(newUserData({
      id: "id-a",
      data: { blocks: ["id-b"] }
    }));

    const res = await mockAPICall(newUser({ id: "id-a" }), getData());

    const update = await userDataCol().findOne();

    testMock(res.json, [{}]);

    expect(update.data.blocks).toEqual([]);

  });

});
