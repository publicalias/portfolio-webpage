"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/favorite-handlers");

const { newFavorite } = require("../../../../schemas");

//global imports

const { newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests, testAuthFail, testInsert } = require("redux/tests/server-tests");

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
    name: "Venue A",
    id: "id-a"
  });

  it("sends status if authentication fails", async () => {

    await testAuthFail(mockAPICall, getData());

    expect(await favoritesCol().countDocuments()).toEqual(0);

  });

  it("sends errors if favorite already exists", async () => {

    await favoritesCol().insertOne(newFavorite({
      user: { id: "id-b" },
      venue: { id: "id-a" }
    }));

    const res = await mockAPICall(newUser({ id: "id-b" }), getData());

    testMock(res.json, [{ errors: ["Favorite already exists"] }]);

    expect(await favoritesCol().countDocuments()).toEqual(1);

  });

  it("sends noop if successful", async () => {

    const res = await mockAPICall(
      newUser({
        name: "User B",
        id: "id-b"
      }),
      getData()
    );

    testMock(res.json, [{}]);

    await testInsert(favoritesCol);

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

  it("sends status if authentication fails", async () => {

    await testAuthFail(mockAPICall, getData(), [newUser()]);

    expect(await favoritesCol().countDocuments()).toEqual(1);

  });

  it("sends noop if successful", async () => {

    const res = await mockAPICall(newUser({ id: "id-b" }), getData());

    testMock(res.json, [{}]);

    expect(await favoritesCol().countDocuments()).toEqual(0);

  });

});
