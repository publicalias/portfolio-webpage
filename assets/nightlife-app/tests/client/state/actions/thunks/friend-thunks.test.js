"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//friend accept

describe("friendAccept", () => {

  const { friendAccept } = actions;

  testAPI.default(friendAccept(""), {
    path: "/nightlife-app/api/friend-accept",
    method: "PATCH",
    data: { id: "" }
  });

});

//friend add

describe("friendAdd", () => {

  const { friendAdd } = actions;

  testAPI.default(friendAdd("", ""), {
    path: "/nightlife-app/api/friend-add",
    method: "POST",
    data: {
      name: "",
      id: ""
    }
  });

});

//friend cancel

describe("friendCancel", () => {

  const { friendCancel } = actions;

  testAPI.default(friendCancel(""), {
    path: "/nightlife-app/api/friend-cancel",
    method: "DELETE",
    data: { id: "" }
  });

});

//friend dismiss

describe("friendDismiss", () => {

  const { friendDismiss } = actions;

  testAPI.default(friendDismiss(""), {
    path: "/nightlife-app/api/friend-dismiss",
    method: "PATCH",
    data: { id: "" }
  });

});

//friend get list

describe("friendGetList", () => {

  const { friendGetList } = actions;

  testAPI.default(friendGetList(), {
    path: "/nightlife-app/api/friend-get-list",
    method: "GET"
  });

});

//friend reject

describe("friendReject", () => {

  const { friendReject } = actions;

  testAPI.default(friendReject(""), {
    path: "/nightlife-app/api/friend-reject",
    method: "DELETE",
    data: { id: "" }
  });

});

//friend remove

describe("friendRemove", () => {

  const { friendRemove } = actions;

  testAPI.default(friendRemove(""), {
    path: "/nightlife-app/api/friend-remove",
    method: "DELETE",
    data: { id: "" }
  });

});
