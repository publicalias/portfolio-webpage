"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//friend add

describe("friendAdd", () => {

  const { friendAdd } = actions;

  testAPI.default(friendAdd("", ""), {
    type: "FRIEND_ADD",
    path: "/nightlife-app/api/friend-add",
    method: "POST",
    data: {
      name: "",
      id: ""
    }
  });

});

//friend confirm

describe("friendConfirm", () => {

  const { friendConfirm } = actions;

  testAPI.default(friendConfirm(""), {
    type: "FRIEND_CONFIRM",
    path: "/nightlife-app/api/friend-confirm",
    method: "PATCH",
    data: { id: "" }
  });

});

//friend dismiss

describe("friendDismiss", () => {

  const { friendDismiss } = actions;

  testAPI.default(friendDismiss(""), {
    type: "FRIEND_DISMISS",
    path: "/nightlife-app/api/friend-dismiss",
    method: "PATCH",
    data: { id: "" }
  });

});

//friend get list

describe("friendGetList", () => {

  const { friendGetList } = actions;

  testAPI.default(friendGetList(), {
    type: "FRIEND_GET_LIST",
    path: "/nightlife-app/api/friend-get-list",
    method: "GET"
  });

});

//friend remove

describe("friendRemove", () => {

  const { friendRemove } = actions;

  testAPI.default(friendRemove(""), {
    type: "FRIEND_REMOVE",
    path: "/nightlife-app/api/friend-remove",
    method: "DELETE",
    data: { id: "" }
  });

});
