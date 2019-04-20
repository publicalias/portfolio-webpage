"use strict";

//local imports

const { reduxAPICall } = require("../../../app-logic");
const { metaNoOp } = require("../factories/meta-factories");

//view add option

const viewAddOption = (id) => (dispatch, getState) => {

  const { view } = getState();

  const args = {
    path: "/api/view-add-option",
    method: "PATCH",
    data: {
      id,
      text: view.add
    }
  };

  return reduxAPICall(dispatch, args);

};

//view cast vote

const viewCastVote = (id, text) => (dispatch) => {

  const args = {
    path: "/api/view-cast-vote",
    method: "PATCH",
    data: {
      id,
      text
    }
  };

  return reduxAPICall(dispatch, args);

};

//view delete poll

const viewDeletePoll = (id, history) => (dispatch) => {

  const args = {
    path: "/api/view-delete-poll",
    method: "DELETE",
    data: { id }
  };

  const success = () => {

    dispatch(metaNoOp());

    history.push("/voting-app/list");

  };

  return reduxAPICall(dispatch, args, success);

};

//view open list

const viewOpenList = (history) => (dispatch) => {

  dispatch(metaNoOp());

  history.push("/voting-app/list");

};

//view remove option

const viewRemoveOption = (id, text) => (dispatch) => {

  const args = {
    path: "/api/view-remove-option",
    method: "PATCH",
    data: {
      id,
      text
    }
  };

  return reduxAPICall(dispatch, args);

};

//view toggle private

const viewTogglePrivate = (id) => (dispatch) => {

  const args = {
    path: "/api/view-toggle-private",
    method: "PATCH",
    data: { id }
  };

  return reduxAPICall(dispatch, args);

};

//exports

module.exports = {
  viewAddOption,
  viewCastVote,
  viewDeletePoll,
  viewOpenList,
  viewRemoveOption,
  viewTogglePrivate
};
