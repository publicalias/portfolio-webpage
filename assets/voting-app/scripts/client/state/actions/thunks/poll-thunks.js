"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//poll add option

const pollAddOption = (id, text) => (dispatch) => reduxAPICall(dispatch, {
  path: "/voting-app/api/poll-add-option",
  method: "PATCH",
  data: {
    id,
    text
  }
});

//poll cast vote

const pollCastVote = (id, text) => (dispatch) => reduxAPICall(dispatch, {
  path: "/voting-app/api/poll-cast-vote",
  method: "PATCH",
  data: {
    id,
    text
  }
});

//poll remove option

const pollRemoveOption = (id, text) => (dispatch) => reduxAPICall(dispatch, {
  path: "/voting-app/api/poll-remove-option",
  method: "PATCH",
  data: {
    id,
    text
  }
});

//poll remove vote

const pollRemoveVote = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/voting-app/api/poll-remove-vote",
  method: "PATCH",
  data: { id }
});

//poll toggle flag

const pollToggleFlag = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/voting-app/api/poll-toggle-flag",
  method: "PATCH",
  data: { id }
});

//poll toggle hide

const pollToggleHide = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/voting-app/api/poll-toggle-hide",
  method: "PATCH",
  data: { id }
});

//poll toggle secret

const pollToggleSecret = (id) => (dispatch) => reduxAPICall(dispatch, {
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
