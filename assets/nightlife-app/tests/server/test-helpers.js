"use strict";

//local imports

const handlers = require("../../scripts/server/api/handlers/venue-handlers");

const { newFavorite, newFriend, newGeoPoint, newRSVP, newUserData, newVenue } = require("../../schemas");

//global imports

const { newUser } = require("redux/schemas");
const { initTestErrors, overlyLongInput, testMock } = require("redux/tests/meta-tests");

//utilities

const favoritesCol = () => db.collection("nightlife-app/favorites");
const friendsCol = () => db.collection("nightlife-app/friends");
const rsvpsCol = () => db.collection("nightlife-app/rsvps");
const userDataCol = () => db.collection("nightlife-app/user-data");

//get geo point

const getGeoPoint = (x, y = x) => newGeoPoint({ coordinates: [x, y] });

//init test user item

const initTestUserItem = (mockAPICall, getData, getItemData) => async (id) => {

  await Promise.all([
    favoritesCol().insertOne(newFavorite({ user: { id: "id-a" } })),
    friendsCol().insertOne(newFriend({
      from: { id: "id-a" },
      confirmed: true
    })),
    userDataCol().insertOne(newUserData({
      id: "id-a",
      data: { location: getGeoPoint(0) }
    }))
  ]);

  const res = await mockAPICall(id ? newUser({ id }) : {}, getData());

  const item = await userDataCol().findOne();

  Object.assign(item.data, await getItemData());

  testMock(res.json, [{ users: { data: [item] } }]);

};

//inject handler

const injectHandler = (action, data) => {

  const handler = jest.fn(() => data);

  action.injected.lib.handler = handler;

  return {
    data,
    handler
  };

};

//init test venue item

const initTestVenueItem = (mockAPICall, getData, getItemData) => async (id) => {

  const { venueGetItem } = handlers;

  const { data, handler } = injectHandler(venueGetItem, {
    coordinates: {
      latitude: 0,
      longitude: 0
    },
    id: "id-a"
  });

  await favoritesCol().insertOne(newFavorite({
    user: { id: "id-c" },
    venue: { id: "id-a" }
  }));

  await rsvpsCol().insertOne(newRSVP({
    user: { id: "id-c" },
    venue: { id: "id-a" }
  }));

  const res = await mockAPICall(id ? newUser({ id }) : {}, getData());

  const item = newVenue(data, await getItemData());

  testMock(handler, ["id-a"]);
  testMock(res.json, [{ venues: { data: [item] } }]);

};

//insert friend

const insertFriend = (from, to) => friendsCol().insertOne(newFriend({
  from: { id: from },
  to: { id: to },
  confirmed: true
}));

//test search

const testSearch = initTestErrors([
  ["sends errors if range is out of bounds (above)", ["Range is out of bounds", { range: 30 }]],
  ["sends errors if range is out of bounds (below)", ["Range is out of bounds", { range: 0 }]],
  ["sends errors if search exceeds character limit", ["Search exceeds character limit", { search: overlyLongInput }]]
]);

//exports

module.exports = {
  getGeoPoint,
  initTestUserItem,
  initTestVenueItem,
  injectHandler,
  insertFriend,
  testSearch
};
