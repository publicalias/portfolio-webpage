"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//rsvp add

describe("rsvpAdd", () => {

  const { rsvpAdd } = actions;

  testAPI.default(rsvpAdd("", "", "", ""), {
    type: "RSVP_ADD",
    path: "/nightlife-app/api/rsvp-add",
    method: "POST",
    data: {
      name: "",
      id: "",
      time: "",
      message: ""
    }
  });

});

//rsvp dismiss

describe("rsvpDismiss", () => {

  const { rsvpDismiss } = actions;

  testAPI.default(rsvpDismiss(""), {
    type: "RSVP_DISMISS",
    path: "/nightlife-app/api/rsvp-dismiss",
    method: "PATCH",
    data: { id: "" }
  });

});

//rsvp get list

describe("rsvpGetList", () => {

  const { rsvpGetList } = actions;

  testAPI.default(rsvpGetList(), {
    type: "RSVP_GET_LIST",
    path: "/nightlife-app/api/rsvp-get-list",
    method: "GET"
  });

});

//rsvp remove

describe("rsvpRemove", () => {

  const { rsvpRemove } = actions;

  testAPI.default(rsvpRemove(""), {
    type: "RSVP_REMOVE",
    path: "/nightlife-app/api/rsvp-remove",
    method: "DELETE",
    data: { id: "" }
  });

});
