"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");
const { metaAddErrors, metaSetState } = require("../factories/meta-factories");
const { initialState } = require("../../reducer/reducer");

//global imports

const { deepCopy } = require("utilities");

//view add option

const viewAddOption = (id) => (dispatch, getState) => {

  const { list, view } = getState();

  const args = {
    path: "/api/view-add-option",
    method: "PATCH",
    data: {
      poll: id,
      text: view.add,
      list
    }
  };

  const success = (res) => {

    const { polls, errors } = res;

    dispatch(errors ? metaAddErrors(errors) : metaSetState({ polls }));

  };

  return reduxAPICall(dispatch, args, success);

};

//view cast vote

const viewCastVote = (id, text) => (dispatch, getState) => {

  const { list } = getState();

  const args = {
    path: "/api/view-cast-vote",
    method: "PATCH",
    data: {
      poll: id,
      text,
      list
    }
  };

  return reduxAPICall(dispatch, args);

};

//view delete poll

const viewDeletePoll = (id) => (dispatch, getState) => {

  const { polls, list } = getState();

  const args = {
    path: "/api/view-delete-poll",
    method: "DELETE",
    data: {
      poll: id,
      list
    }
  };

  const index = polls.indexOf(id);

  const success = (res) => {

    const { polls } = res;

    dispatch(metaSetState(polls.length ? {
      polls,
      view: deepCopy(initialState.view, { poll: (polls[index] || polls[0]).id })
    } : {
      polls,
      page: "list"
    }));

  };

  return reduxAPICall(dispatch, args, success);

};

//view remove option

const viewRemoveOption = (id, text) => (dispatch, getState) => {

  const { list } = getState();

  const args = {
    path: "/api/view-remove-option",
    method: "PATCH",
    data: {
      poll: id,
      text,
      list
    }
  };

  return reduxAPICall(dispatch, args);

};

//view toggle private

const viewTogglePrivate = (id) => (dispatch, getState) => {

  const { list } = getState();

  const args = {
    path: "/api/view-toggle-private",
    method: "PATCH",
    data: {
      poll: id,
      list
    }
  };

  return reduxAPICall(dispatch, args);

};

//exports

module.exports = {
  viewAddOption,
  viewCastVote,
  viewDeletePoll,
  viewRemoveOption,
  viewTogglePrivate
};
