"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/venue-handlers");

const { newFriend, newListParamsVenues, newVenue, newYelpParams } = require("../../../../schemas");
const { getGeoPoint, initTestVenueItem, injectHandler, insertFriend, testSearch } = require("../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests } = require("redux/tests/server-tests");

//utilities

const favoritesCol = () => db.collection("nightlife-app/favorites");
const friendsCol = () => db.collection("nightlife-app/friends");

const injectHandlerWithList = () => {

  const { venueGetList } = handlers;

  return injectHandler(venueGetList, [{
    coordinates: {
      latitude: 0,
      longitude: 0
    },
    id: "id-a"
  }]);

};

//setup

beforeAll(mongoTests.setup);
beforeEach(mongoTests.reset(favoritesCol, friendsCol));
afterAll(mongoTests.teardown);

//venue get item

describe("venueGetItem (no data)", () => {

  const { venueGetItem } = handlers;

  const mockAPICall = initMockAPICall(venueGetItem, "GET");

  const getData = (location = getGeoPoint(0.05)) => ({
    id: "id-a",
    location
  });

  const testGetItem = async (data, args) => {

    const { handler } = injectHandler(venueGetItem, null);

    const res = await mockAPICall({}, data);

    testMock(handler, args);
    testMock(res.json, [{ venues: { data: [] } }]);

  };

  it("sends data if successful (no location)", () => testGetItem(getData(null)));

  it("sends data if successful (no response)", () => testGetItem(getData(), ["id-a"]));

});

describe("venueGetItem (data)", () => {

  const { venueGetItem } = handlers;

  const mockAPICall = initMockAPICall(venueGetItem, "GET");

  const getData = () => ({
    id: "id-a",
    location: getGeoPoint(0.05)
  });

  const testGetItem = initTestVenueItem(mockAPICall, getData, () => ({ distance: 4.9 }));

  it("sends data if successful (no user)", () => testGetItem());

  it("sends data if successful (no relation)", () => testGetItem("id-b"));

  it("sends data if successful (unconfirmed)", async () => {

    await friendsCol().insertOne(newFriend({
      from: { id: "id-b" },
      to: { id: "id-c" }
    }));

    await testGetItem("id-b");

  });

});

describe("venueGetItem (data, friends)", () => {

  const { venueGetItem } = handlers;

  const mockAPICall = initMockAPICall(venueGetItem, "GET");

  const getData = () => ({
    id: "id-a",
    location: getGeoPoint(0.05)
  });

  const testGetItem = initTestVenueItem(mockAPICall, getData, async () => ({
    distance: 4.9,
    favorites: await favoritesCol()
      .find()
      .toArray()
  }));

  it("sends data if successful (self)", () => testGetItem("id-c"));

  it("sends data if successful (friends, from)", async () => {

    await insertFriend("id-b", "id-c");

    await testGetItem("id-b");

  });

  it("sends data if successful (friends, to)", async () => {

    await insertFriend("id-c", "id-b");

    await testGetItem("id-b");

  });

});

//venue get list

describe("venueGetList (no data)", () => {

  const { venueGetList } = handlers;

  const mockAPICall = initMockAPICall(venueGetList, "GET");

  const getData = (params, location = getGeoPoint(0)) => ({
    params: newListParamsVenues(params),
    length: 0,
    location
  });

  const testGetList = async (data, args) => {

    const { handler } = injectHandler(venueGetList, []);

    const res = await mockAPICall({}, data);

    testMock(handler, args);
    testMock(res.json, [{ venues: { data: [] } }]);

  };

  testSearch(async (error, params) => {

    const { handler } = injectHandler(venueGetList, []);

    const res = await mockAPICall({}, getData(params));

    testMock(handler);
    testMock(res.json, [{ errors: [error] }]);

  });

  it("sends data if successful (no location)", () => testGetList(getData(null, null)));

  it("sends data if successful (no response)", () => testGetList(getData(), [null, newYelpParams()]));

});

describe("venueGetList (data, length)", () => {

  const { venueGetList } = handlers;

  const mockAPICall = initMockAPICall(venueGetList, "GET");

  const getData = (length) => ({
    params: newListParamsVenues(),
    length,
    location: getGeoPoint(0)
  });

  const testGetList = async (length) => {

    const { data, handler } = injectHandlerWithList();

    const res = await mockAPICall({}, getData(length));

    const venues = Array(length).concat(data.map(newVenue));

    testMock(handler, [null, newYelpParams({ offset: length })]);
    testMock(res.json, [{ venues: { data: venues } }]);

  };

  it("sends data if successful (length, 0)", () => testGetList(0));

  it("sends data if successful (length, 1)", () => testGetList(1));

});

describe("venueGetList (data, params)", () => {

  const { venueGetList } = handlers;

  const mockAPICall = initMockAPICall(venueGetList, "GET");

  const getData = (params, location = getGeoPoint(0)) => ({
    params: newListParamsVenues(params),
    length: 0,
    location
  });

  const testGetList = async (input, output, location, coordinates, distance) => {

    const { data, handler } = injectHandlerWithList();

    const res = await mockAPICall({}, getData(input, location));

    const venues = data.map((e) => newVenue(e, distance));

    testMock(handler, [null, newYelpParams(output, coordinates)]);
    testMock(res.json, [{ venues: { data: venues } }]);

  };

  it("sends data if successful (range)", () => testGetList({ range: 25 }, { radius: 40000 }, getGeoPoint(0.05), {
    latitude: 0.05,
    longitude: 0.05
  }, {
    distance: 4.9
  }));

  it("sends data if successful (search)", () => testGetList({ search: "Coffee" }, { term: "Coffee" }));

  it("sends data if successful (sort)", () => testGetList({ sort: "distance" }, { sort_by: "distance" }));

});
