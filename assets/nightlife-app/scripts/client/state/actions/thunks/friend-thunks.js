"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//friend add

const friendAdd = (name, id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/friend-add",
  method: "POST",
  data: {
    name,
    id
  }
});

//friend confirm

const friendConfirm = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/friend-confirm",
  method: "PATCH",
  data: { id }
});

//friend dismiss

const friendDismiss = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/friend-dismiss",
  method: "PATCH",
  data: { id }
});

//friend get list

const friendGetList = () => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/friend-get-list",
  method: "GET"
});

//friend remove

const friendRemove = (id) => (dispatch) => reduxAPICall(dispatch, {
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
