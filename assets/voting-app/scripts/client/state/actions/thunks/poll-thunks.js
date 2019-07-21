"use strict";

//global imports

const { reduxAPICall } = require("redux-utils/client-utils");

//poll add option

const pollAddOption = (id, text) => (dispatch) => {

  const args = {
    path: "/voting-app/api/poll-add-option",
    method: "PATCH",
    data: {
      id,
      text
    }
  };

  return reduxAPICall(dispatch, args);

};

//poll cast vote

const pollCastVote = (id, text) => (dispatch) => {

  const args = {
    path: "/voting-app/api/poll-cast-vote",
    method: "PATCH",
    data: {
      id,
      text
    }
  };

  return reduxAPICall(dispatch, args);

};

//poll remove option

const pollRemoveOption = (id, text) => (dispatch) => {

  const args = {
    path: "/voting-app/api/poll-remove-option",
    method: "PATCH",
    data: {
      id,
      text
    }
  };

  return reduxAPICall(dispatch, args);

};

//poll toggle flag

const pollToggleFlag = (id) => (dispatch) => {

  const args = {
    path: "/voting-app/api/poll-toggle-flag",
    method: "PATCH",
    data: { id }
  };

  return reduxAPICall(dispatch, args);

};

//poll toggle hide

const pollToggleHide = (id) => (dispatch) => {

  const args = {
    path: "/voting-app/api/poll-toggle-hide",
    method: "PATCH",
    data: { id }
  };

  return reduxAPICall(dispatch, args);

};

//poll toggle secret

const pollToggleSecret = (id) => (dispatch) => {

  const args = {
    path: "/voting-app/api/poll-toggle-secret",
    method: "PATCH",
    data: { id }
  };

  return reduxAPICall(dispatch, args);

};

//exports

module.exports = {
  pollAddOption,
  pollCastVote,
  pollRemoveOption,
  pollToggleFlag,
  pollToggleHide,
  pollToggleSecret
};
