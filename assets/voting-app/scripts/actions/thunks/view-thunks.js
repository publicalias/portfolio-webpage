"use strict";

//local imports

const { reduxAPICall } = require("../../app-logic");
const { metaAddErrors, metaSetState } = require("../factories/meta-factories");
const { initialState } = require("../../reducer/reducer");

//global imports

const { initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//view add option

const viewAddOption = (id) => (dispatch, getState) => {

  const { list, view } = getState();

  const body = {
    poll: id,
    text: view.add,
    list
  };

  const success = (res) => {

    const { polls, errors } = res;

    dispatch(errors ? metaAddErrors(errors) : metaSetState({ polls }));

  };

  return reduxAPICall(dispatch, "/api/view-add-option", body, success);

};

//view cast vote

const viewCastVote = (id, text) => (dispatch, getState) => {

  const { list } = getState();

  const body = {
    poll: id,
    text,
    list
  };

  return reduxAPICall(dispatch, "/api/view-cast-vote", body);

};

//view delete poll

const viewDeletePoll = (id) => (dispatch, getState) => {

  const { polls, list } = getState();

  const body = {
    poll: id,
    list
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

  return reduxAPICall(dispatch, "/api/view-delete-poll", body, success);

};

//view remove option

const viewRemoveOption = (id, text) => (dispatch, getState) => {

  const { list } = getState();

  const body = {
    poll: id,
    text,
    list
  };

  return reduxAPICall(dispatch, "/api/view-remove-option", body);

};

//view toggle private

const viewTogglePrivate = (id) => (dispatch, getState) => {

  const { list } = getState();

  const body = {
    poll: id,
    list
  };

  return reduxAPICall(dispatch, "/api/view-toggle-private", body);

};

//exports

module.exports = {
  viewAddOption,
  viewCastVote,
  viewDeletePoll,
  viewRemoveOption,
  viewTogglePrivate
};
