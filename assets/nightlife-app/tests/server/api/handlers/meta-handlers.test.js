"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/meta-handlers");

const { newUserData, newUserWithData } = require("../../../../schemas");
const { getGeoPoint } = require("../../test-helpers");

//global imports

const { newUser } = require("redux/schemas");
const { overlyLongInput, testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail, testInsert } = require("redux/tests/server-tests");

//utilities

const userDataCol = () => db.collection("nightlife-app/user-data");

const insertUserData = (data) => userDataCol().insertOne(newUserData({ id: "id-a" }, data));

//setup

beforeAll(mongoTests.setup);
beforeEach(mongoTests.reset(userDataCol));
afterAll(mongoTests.teardown);

//meta get user

describe("metaGetUser", () => {

  const { metaGetUser } = handlers;

  const mockAPICall = initMockAPICall(metaGetUser, "GET");

  it("sends data if successful (user is not authenticated)", async () => {

    const res = await mockAPICall();

    testMock(res.json, [{ user: {} }]);

  });

  it("sends data if successful (user data exists)", async () => {

    await insertUserData({ data: { location: {} } });

    const res = await mockAPICall(newUser({
      id: "id-a",
      data: { restricted: true }
    }));

    testMock(res.json, [{
      user: newUserWithData({
        id: "id-a",
        data: {
          restricted: true,
          location: {}
        }
      })
    }]);

  });

  it("sends data if successful (no user data exists)", async () => {

    const res = await mockAPICall(newUser({
      name: "User A",
      id: "id-a"
    }));

    testMock(res.json, [{
      user: newUserWithData({
        name: "User A",
        id: "id-a"
      })
    }]);

    await testInsert(userDataCol);

  });

});

//meta save address

describe("metaSaveAddress", () => {

  const { metaSaveAddress } = handlers;

  const mockAPICall = initMockAPICall(metaSaveAddress, "PATCH");

  const getData = (address, location) => ({
    address,
    location
  });

  const testSave = async (address = "", location = null) => {

    const res = await mockAPICall(newUser({ id: "id-a" }), getData(address, location));

    const update = await userDataCol().findOne();

    const { lib: { geoCode } } = metaSaveAddress.injected;

    testMock(geoCode, address && [address]);

    expect(update.data.address).toEqual(address);
    expect(update.data.location).toEqual(address ? getGeoPoint(1) : location);

    testMock(res.json, [{}]);

  };

  beforeEach(async () => {

    metaSaveAddress.injected.lib.geoCode = jest.fn((address) => address ? getGeoPoint(1) : null);

    await insertUserData({
      data: {
        address: "12345",
        location: getGeoPoint(0)
      }
    });

  });

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData()));

  it("sends errors if address exceeds character limit", async () => {

    const res = await mockAPICall(newUser(), getData(overlyLongInput));

    testMock(res.json, [{ errors: ["Address exceeds character limit"] }]);

  });

  it("sends noop if successful (address)", () => testSave("67890"));

  it("sends noop if successful (location)", () => testSave("", getGeoPoint(1)));

  it("sends noop if successful (neither)", () => testSave());

});

//meta save avatar

describe("metaSaveAvatar", () => {

  const { metaSaveAvatar } = handlers;

  const mockAPICall = initMockAPICall(metaSaveAvatar, "PATCH");

  const getData = (avatar = "https://www.example.com/avatar.jpg") => ({ avatar });

  beforeEach(() => insertUserData());

  it("sends status if authentication fails", () => testAuthFail(mockAPICall, getData()));

  it("sends errors if avatar exceeds character limit", async () => {

    const res = await mockAPICall(newUser(), getData(overlyLongInput));

    testMock(res.json, [{ errors: ["Avatar exceeds character limit"] }]);

  });

  it("sends noop if successful", async () => {

    const res = await mockAPICall(newUser({ id: "id-a" }), getData());

    const update = await userDataCol().findOne();

    expect(update.data.avatar).toEqual(getData().avatar);

    testMock(res.json, [{}]);

  });

});
