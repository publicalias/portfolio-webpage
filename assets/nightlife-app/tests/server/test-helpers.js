"use strict";

//local imports

const { newFriend, newUserData } = require("../../schemas");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");
const userDataCol = () => db.collection("nightlife-app/user-data");

const initCol = (collection, newSchema, init) => (data) => () => collection().insertOne(newSchema(init, data));

//init friends col

const initFriendsCol = initCol(friendsCol, newFriend, {
  id: "id-a",
  from: { id: "id-b" },
  to: { id: "id-c" }
});

//init user data col

const initUserDataCol = initCol(userDataCol, newUserData, { id: "id-a" });

//exports

module.exports = {
  initFriendsCol,
  initUserDataCol
};
