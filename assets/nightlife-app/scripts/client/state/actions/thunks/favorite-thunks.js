"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//favorite add

const favoriteAdd = (name, id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/favorite-add",
  method: "POST",
  data: {
    venue: {
      name,
      id
    }
  }
});

//favorite remove

const favoriteRemove = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/favorite-remove",
  method: "DELETE",
  data: { id }
});

//exports

module.exports = {
  favoriteAdd,
  favoriteRemove
};
