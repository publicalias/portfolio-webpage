"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//poll add option

describe("pollAddOption", () => {

  const { pollAddOption } = actions;

  testAPI.default(pollAddOption("", ""), {
    type: "POLL_ADD_OPTION",
    path: "/voting-app/api/poll-add-option",
    method: "PATCH",
    data: {
      id: "",
      text: ""
    }
  });

});

//poll cast vote

describe("pollCastVote", () => {

  const { pollCastVote } = actions;

  testAPI.default(pollCastVote("", ""), {
    type: "POLL_CAST_VOTE",
    path: "/voting-app/api/poll-cast-vote",
    method: "PATCH",
    data: {
      id: "",
      text: ""
    }
  });

});

//poll remove option

describe("pollRemoveOption", () => {

  const { pollRemoveOption } = actions;

  testAPI.default(pollRemoveOption("", ""), {
    type: "POLL_REMOVE_OPTION",
    path: "/voting-app/api/poll-remove-option",
    method: "PATCH",
    data: {
      id: "",
      text: ""
    }
  });

});

//poll remove vote

describe("pollRemoveVote", () => {

  const { pollRemoveVote } = actions;

  testAPI.default(pollRemoveVote(""), {
    type: "POLL_REMOVE_VOTE",
    path: "/voting-app/api/poll-remove-vote",
    method: "PATCH",
    data: { id: "" }
  });

});

//poll toggle flag

describe("pollToggleFlag", () => {

  const { pollToggleFlag } = actions;

  testAPI.default(pollToggleFlag(""), {
    type: "POLL_TOGGLE_FLAG",
    path: "/voting-app/api/poll-toggle-flag",
    method: "PATCH",
    data: { id: "" }
  });

});

//poll toggle hide

describe("pollToggleHide", () => {

  const { pollToggleHide } = actions;

  testAPI.default(pollToggleHide(""), {
    type: "POLL_TOGGLE_HIDE",
    path: "/voting-app/api/poll-toggle-hide",
    method: "PATCH",
    data: { id: "" }
  });

});

//poll toggle secret

describe("pollToggleSecret", () => {

  const { pollToggleSecret } = actions;

  testAPI.default(pollToggleSecret(""), {
    type: "POLL_TOGGLE_SECRET",
    path: "/voting-app/api/poll-toggle-secret",
    method: "PATCH",
    data: { id: "" }
  });

});
