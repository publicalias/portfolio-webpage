"use strict";

//local imports

const { newFriend } = require("../../schemas");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");

//init friends col

const initFriendsCol = (confirmed = false) => () => friendsCol().insertOne(newFriend({
  id: "id-a",
  from: { id: "id-b" },
  to: { id: "id-c" },
  confirmed
}));

//exports

module.exports = { initFriendsCol };
