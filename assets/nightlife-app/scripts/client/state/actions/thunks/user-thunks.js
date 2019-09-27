"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//user get item

const userGetItem = (id, location) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/user-get-item",
  method: "GET",
  data: {
    id,
    location
  }
});

//user get list

const userGetList = (params, length, location) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/user-get-list",
  method: "GET",
  data: {
    params,
    length,
    location
  }
}, {
  array: false
});

//user toggle block

const userToggleBlock = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/user-toggle-block",
  method: "PATCH",
  data: { id }
});

//exports

module.exports = {
  userGetItem,
  userGetList,
  userToggleBlock
};
