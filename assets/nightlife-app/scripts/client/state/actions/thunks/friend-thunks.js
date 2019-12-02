"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//friend add

const friendAdd = (name, id) => reduxAPICall({
  type: "FRIEND_ADD",
  path: "/nightlife-app/api/friend-add",
  method: "POST",
  data: {
    name,
    id
  }
});

//friend confirm

const friendConfirm = (id) => reduxAPICall({
  type: "FRIEND_CONFIRM",
  path: "/nightlife-app/api/friend-confirm",
  method: "PATCH",
  data: { id }
});

//friend dismiss

const friendDismiss = (id) => reduxAPICall({
  type: "FRIEND_DISMISS",
  path: "/nightlife-app/api/friend-dismiss",
  method: "PATCH",
  data: { id }
});

//friend get list

const friendGetList = () => reduxAPICall({
  type: "FRIEND_GET_LIST",
  path: "/nightlife-app/api/friend-get-list",
  method: "GET"
});

//friend remove

const friendRemove = (id) => reduxAPICall({
  type: "FRIEND_REMOVE",
  path: "/nightlife-app/api/friend-remove",
  method: "DELETE",
  data: { id }
});

//exports

module.exports = {
  friendAdd,
  friendConfirm,
  friendDismiss,
  friendGetList,
  friendRemove
};
