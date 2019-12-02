"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//poll add option

const pollAddOption = (id, text) => reduxAPICall({
  type: "POLL_ADD_OPTION",
  path: "/voting-app/api/poll-add-option",
  method: "PATCH",
  data: {
    id,
    text
  }
});

//poll cast vote

const pollCastVote = (id, text) => reduxAPICall({
  type: "POLL_CAST_VOTE",
  path: "/voting-app/api/poll-cast-vote",
  method: "PATCH",
  data: {
    id,
    text
  }
});

//poll remove option

const pollRemoveOption = (id, text) => reduxAPICall({
  type: "POLL_REMOVE_OPTION",
  path: "/voting-app/api/poll-remove-option",
  method: "PATCH",
  data: {
    id,
    text
  }
});

//poll remove vote

const pollRemoveVote = (id) => reduxAPICall({
  type: "POLL_REMOVE_VOTE",
  path: "/voting-app/api/poll-remove-vote",
  method: "PATCH",
  data: { id }
});

//poll toggle flag

const pollToggleFlag = (id) => reduxAPICall({
  type: "POLL_TOGGLE_FLAG",
  path: "/voting-app/api/poll-toggle-flag",
  method: "PATCH",
  data: { id }
});

//poll toggle hide

const pollToggleHide = (id) => reduxAPICall({
  type: "POLL_TOGGLE_HIDE",
  path: "/voting-app/api/poll-toggle-hide",
  method: "PATCH",
  data: { id }
});

//poll toggle secret

const pollToggleSecret = (id) => reduxAPICall({
  type: "POLL_TOGGLE_SECRET",
  path: "/voting-app/api/poll-toggle-secret",
  method: "PATCH",
  data: { id }
});

//exports

module.exports = {
  pollAddOption,
  pollCastVote,
  pollRemoveOption,
  pollRemoveVote,
  pollToggleFlag,
  pollToggleHide,
  pollToggleSecret
};
