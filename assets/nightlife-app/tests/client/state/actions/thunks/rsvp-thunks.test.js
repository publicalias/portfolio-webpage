"use strict";

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//rsvp add

describe("rsvpAdd", () => {

  const { rsvpAdd } = actions;

  testAPI.default(rsvpAdd("", "", "", ""), {
    path: "nightlife-app/api/rsvp-add",
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
    path: "nightlife-app/api/rsvp-dismiss",
    method: "PATCH",
    data: { id: "" }
  });

});

//rsvp get data

describe("rsvpGetData", () => {

  const { rsvpGetData } = actions;

  testAPI.default(rsvpGetData(), {
    path: "nightlife-app/api/rsvp-get-data",
    method: "GET"
  });

});

//rsvp remove

describe("rsvpRemove", () => {

  const { rsvpRemove } = actions;

  testAPI.default(rsvpRemove(""), {
    path: "nightlife-app/api/rsvp-remove",
    method: "DELETE",
    data: { id: "" }
  });

});
