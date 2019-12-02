"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//favorite add

const favoriteAdd = (name, id) => reduxAPICall({
  type: "FAVORITE_ADD",
  path: "/nightlife-app/api/favorite-add",
  method: "POST",
  data: {
    name,
    id
  }
});

//favorite remove

const favoriteRemove = (id) => reduxAPICall({
  type: "FAVORITE_REMOVE",
  path: "/nightlife-app/api/favorite-remove",
  method: "DELETE",
  data: { id }
});

//exports

module.exports = {
  favoriteAdd,
  favoriteRemove
};
