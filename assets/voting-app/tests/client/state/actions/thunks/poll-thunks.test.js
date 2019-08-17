"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//poll add option

describe("pollAddOption", () => {

  const { pollAddOption } = actions;

  testAPI.default(pollAddOption("", ""), {
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
    path: "/voting-app/api/poll-remove-vote",
    method: "PATCH",
    data: { id: "" }
  });

});

//poll toggle flag

describe("pollToggleFlag", () => {

  const { pollToggleFlag } = actions;

  testAPI.default(pollToggleFlag(""), {
    path: "/voting-app/api/poll-toggle-flag",
    method: "PATCH",
    data: { id: "" }
  });

});

//poll toggle hide

describe("pollToggleHide", () => {

  const { pollToggleHide } = actions;

  testAPI.default(pollToggleHide(""), {
    path: "/voting-app/api/poll-toggle-hide",
    method: "PATCH",
    data: { id: "" }
  });

});

//poll toggle secret

describe("pollToggleSecret", () => {

  const { pollToggleSecret } = actions;

  testAPI.default(pollToggleSecret(""), {
    path: "/voting-app/api/poll-toggle-secret",
    method: "PATCH",
    data: { id: "" }
  });

});
