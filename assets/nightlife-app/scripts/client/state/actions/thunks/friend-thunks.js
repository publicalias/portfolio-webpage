"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//friend accept

const friendAccept = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/friend-accept",
  method: "PATCH",
  data: { id }
});

//friend add

const friendAdd = (name, id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/friend-add",
  method: "POST",
  data: {
    name,
    id
  }
});

//friend cancel

const friendCancel = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/friend-cancel",
  method: "DELETE",
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

//friend reject

const friendReject = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/friend-reject",
  method: "DELETE",
  data: { id }
});

//friend remove

const friendRemove = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/friend-remove",
  method: "DELETE",
  data: { id }
});

//exports

module.exports = {
  friendAccept,
  friendAdd,
  friendCancel,
  friendDismiss,
  friendGetList,
  friendReject,
  friendRemove
};
