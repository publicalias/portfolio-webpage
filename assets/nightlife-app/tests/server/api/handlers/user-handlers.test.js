"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/user-handlers");

const { newFriend, newGeoPoint, newListParamsUsers, newUserData } = require("../../../../schemas");
const { initTestGetItem } = require("../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { initTestErrors, overlyLongInput, testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail } = require("redux/tests/server-tests");

//utilities

const favoritesCol = () => db.collection("nightlife-app/favorites");
const friendsCol = () => db.collection("nightlife-app/friends");
const userDataCol = () => db.collection("nightlife-app/user-data");

const point = (x, y = x) => newGeoPoint({ coordinates: [x, y] });

const insertFriend = (from, to) => friendsCol().insertOne(newFriend({
  from: { id: from },
  to: { id: to },
  confirmed: true
}));

//setup

beforeAll(mongoTests.setup);
beforeEach(mongoTests.reset(favoritesCol, friendsCol, userDataCol));
afterAll(mongoTests.teardown);

//user get item

describe("userGetItem (no data)", () => {

  const { userGetItem } = handlers;

  const mockAPICall = initMockAPICall(userGetItem, "GET");

  const getData = (location = point(0.05)) => ({
    id: "id-a",
    location
  });

  const testGetItem = async (data, location) => {

    if (data) {
      await userDataCol().insertOne(newUserData(data));
    }

    const res = await mockAPICall({}, getData(location));

    testMock(res.json, [{ page: { users: [] } }]);

  };

  it("sends data if successful (id exists, no location, user)", () => testGetItem({
    id: "id-a",
    data: { location: point(0) }
  }, null));

  it("sends data if successful (id exists, no location, item)", () => testGetItem({ id: "id-a" }));

  it("sends data if successful (id does not exist)", () => testGetItem());

});

describe("userGetItem (data)", () => {

  const { userGetItem } = handlers;

  const mockAPICall = initMockAPICall(userGetItem, "GET");

  const getData = () => ({
    id: "id-a",
    location: point(0.05)
  });

  const testGetItem = initTestGetItem(mockAPICall, getData, () => ({ distance: 4.9 }));

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

describe("userGetItem (data and friends)", () => {

  const { userGetItem } = handlers;

  const mockAPICall = initMockAPICall(userGetItem, "GET");

  const getData = () => ({
    id: "id-a",
    location: point(0.05)
  });

  const testGetItem = initTestGetItem(mockAPICall, getData, async () => ({
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

  const getData = (params, location = point(0)) => ({
    params: newListParamsUsers(params),
    length: 0,
    location
  });

  const testErrors = initTestErrors([
    ["sends errors if range is out of bounds (above)", ["Range is out of bounds", { range: 30 }]],
    ["sends errors if range is out of bounds (below)", ["Range is out of bounds", { range: 0 }]],
    ["sends errors if search exceeds character limit", ["Search exceeds character limit", { search: overlyLongInput }]]
  ]);

  const testLocation = async (...args) => {

    const res = await mockAPICall({}, getData(...args));

    testMock(res.json, [{ page: { users: [] } }]);

  };

  beforeEach(() => userDataCol().insertOne(newUserData({ data: { location: point(0) } })));

  testErrors(async (error, params) => {

    const res = await mockAPICall({}, getData(params));

    testMock(res.json, [{ errors: [error] }]);

  });

  it("sends data if successful (no location, user)", () => testLocation(null, null));

  it("sends data if successful (no location, item)", async () => {

    await userDataCol().updateOne({}, { $set: { "data.location": null } });

    await testLocation();

  });

});

describe("userGetList (data)", () => {

  const { userGetList } = handlers;

  const mockAPICall = initMockAPICall(userGetList, "GET");

  const getData = (params, length = 0) => ({
    params: newListParamsUsers(params),
    length,
    location: point(0)
  });

  const testLength = async (length) => {

    const users = Array(1 + 50)
      .fill({ data: { location: point(0) } })
      .map(newUserData);

    await userDataCol().insertMany(users);

    const res = await mockAPICall({}, getData(null, length));

    testMock(res.json, [{ page: { users: Array(length).concat(users.slice(length, length + 50)) } }]);

  };

  const testParams = async (users, params, fn) => {

    await userDataCol().insertMany(users);

    const res = await mockAPICall({}, getData(params));

    testMock(res.json, [{ page: { users: fn(users) } }]);

  };

  it("sends data if successful (length, 0)", () => testLength(0));

  it("sends data if successful (length, 1)", () => testLength(1));

  it("sends data if successful (range)", () => {

    const seeds = Array(3).fill([0.05, 4.9]);

    const users = seeds.map(([coor, dist], i) => newUserData({
      data: {
        distance: dist * (i + 1),
        location: point(coor * (i + 1))
      }
    }));

    return testParams(users, { range: 10 }, (users) => users.slice(0, 2).reverse());

  });

  it("sends data if successful (search)", () => {

    const seeds = ["First Last", "First Last", "First"];

    const users = seeds.map((e) => newUserData({
      name: e,
      data: { location: point(0) }
    }));

    return testParams(users, { search: "Last" }, (users) => users.slice(0, 2));

  });

});

//user toggle block

describe("userToggleBlock", () => {

  const { userToggleBlock } = handlers;

  const mockAPICall = initMockAPICall(userToggleBlock, "PATCH");

  const getData = () => ({ id: "id-b" });

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
