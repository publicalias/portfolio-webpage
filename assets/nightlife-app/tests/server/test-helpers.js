"use strict";

//local imports

const { newFavorite, newFriend, newGeoPoint, newUserData } = require("../../schemas");

//global imports

const { newUser } = require("redux/schemas");
const { initTestErrors, overlyLongInput, testMock } = require("redux/tests/meta-tests");

//utilities

const favoritesCol = () => db.collection("nightlife-app/favorites");
const friendsCol = () => db.collection("nightlife-app/friends");
const userDataCol = () => db.collection("nightlife-app/user-data");

//geo point

const geoPoint = (x, y = x) => newGeoPoint({ coordinates: [x, y] });

//init test get item

const initTestGetItem = (mockAPICall, getData, getItemData) => async (id) => {

  await Promise.all([
    favoritesCol().insertOne(newFavorite({ user: { id: "id-a" } })),
    friendsCol().insertOne(newFriend({
      from: { id: "id-a" },
      confirmed: true
    })),
    userDataCol().insertOne(newUserData({
      id: "id-a",
      data: { location: geoPoint(0) }
    }))
  ]);

  const user = id ? newUser({ id }) : {};

  const res = await mockAPICall(user, getData());

  const item = await userDataCol().findOne();

  Object.assign(item.data, await getItemData());

  testMock(res.json, [{ page: { users: [item] } }]);

};

//test search

const testSearch = initTestErrors([
  ["sends errors if range is out of bounds (above)", ["Range is out of bounds", { range: 30 }]],
  ["sends errors if range is out of bounds (below)", ["Range is out of bounds", { range: 0 }]],
  ["sends errors if search exceeds character limit", ["Search exceeds character limit", { search: overlyLongInput }]]
]);

//exports

module.exports = {
  geoPoint,
  initTestGetItem,
  testSearch
};
