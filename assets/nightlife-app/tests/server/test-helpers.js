"use strict";

//local imports

const { newFavorite, newFriend, newUserData } = require("../../schemas");

//global imports

const { newUser } = require("redux/schemas");
const { testMock } = require("redux/tests/meta-tests");

//utilities

const favoritesCol = () => db.collection("nightlife-app/favorites");
const friendsCol = () => db.collection("nightlife-app/friends");
const userDataCol = () => db.collection("nightlife-app/user-data");

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
      data: { location: { coordinates: [0, 0] } }
    }))
  ]);

  const user = id ? newUser({ id }) : {};

  const res = await mockAPICall(user, getData());

  const item = await userDataCol().findOne();

  Object.assign(item.data, await getItemData());

  testMock(res.json, [{ page: { users: [item] } }]);

};

//exports

module.exports = { initTestGetItem };
