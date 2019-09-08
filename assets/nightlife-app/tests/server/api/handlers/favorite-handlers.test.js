"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/favorite-handlers");

const { newFavorite } = require("../../../../schemas");

//global imports

const { newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail } = require("redux/tests/server-tests");

//utilities

const favoritesCol = () => db.collection("nightlife-app/favorites");

//setup

beforeAll(mongoTests.setup);
beforeEach(mongoTests.reset(favoritesCol));
afterAll(mongoTests.teardown);

//favorite add

describe("favoriteAdd", () => {

  const { favoriteAdd } = handlers;

  const mockAPICall = initMockAPICall(favoriteAdd, "POST");

  const getData = () => ({
    name: "Coffee",
    id: "coffee"
  });

  it("sends 401 if user is unauthenticated or restricted", async () => {

    await testAuthFail(mockAPICall, getData());

    expect(await favoritesCol().countDocuments()).toEqual(0);

  });

  it("sends object if user is authenticated", async () => {

    const res = await mockAPICall(newUser(), getData());

    testMock(res.json, [{}]);

    expect(await favoritesCol().countDocuments()).toEqual(1);

  });

});

//favorite remove

describe("favoriteRemove", () => {

  const { favoriteRemove } = handlers;

  const mockAPICall = initMockAPICall(favoriteRemove, "DELETE");

  const getData = () => ({ id: "id-a" });

  beforeEach(() => favoritesCol().insertOne(newFavorite({
    id: "id-a",
    user: { id: "id-b" }
  })));

  it("sends 401 if user is unauthenticated, restricted, or not the creator", async () => {

    await testAuthFail(mockAPICall, getData(), [newUser({ id: "id-c" })]);

    expect(await favoritesCol().countDocuments()).toEqual(1);

  });

  it("sends object if user is valid", async () => {

    const res = await mockAPICall(newUser({ id: "id-b" }), getData());

    testMock(res.json, [{}]);

    expect(await favoritesCol().countDocuments()).toEqual(0);

  });

});
