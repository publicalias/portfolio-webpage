"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//user get item

const userGetItem = (id, location) => reduxAPICall({
  type: "USER_GET_ITEM",
  path: "/nightlife-app/api/user-get-item",
  method: "GET",
  data: {
    id,
    location
  }
});

//user get list

const userGetList = (params, length, location) => reduxAPICall({
  type: "USER_GET_LIST",
  path: "/nightlife-app/api/user-get-list",
  method: "GET",
  data: {
    params,
    length,
    location
  }
}, {
  ignoreNull: true,
  overwriteArray: false
});

//user toggle block

const userToggleBlock = (id) => reduxAPICall({
  type: "USER_TOGGLE_BLOCK",
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
