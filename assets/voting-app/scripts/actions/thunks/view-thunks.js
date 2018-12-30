"use strict";

//local imports

const { metaAddErrors, metaSetState } = require("../factories/meta-factories");
const { initialState } = require("../../reducer/reducer");

//global imports

const { getJSON, initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//view add option

const viewAddOption = (id) => (dispatch, getState) => {

  const { view } = getState();

  const body = {
    method: "POST",
    body: {
      poll: id,
      text: view.add
    },
    headers: new Headers({ "Content-Type": "application/json" })
  };

  const success = (res) => {

    const { polls, errors } = res;

    dispatch(errors ? metaAddErrors(errors) : metaSetState({ polls }));

  };

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON("/api/view/add-option", body)
    .then(success)
    .catch(failure);

};

//view cast vote

const viewCastVote = (id, text) => (dispatch) => {

  const body = {
    method: "POST",
    body: {
      poll: id,
      text
    },
    headers: new Headers({ "Content-Type": "application/json" })
  };

  const success = (res) => {
    dispatch(metaSetState(res));
  };

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON("/api/view/cast-vote", body)
    .then(success)
    .catch(failure);

};

//view delete poll

const viewDeletePoll = (id) => (dispatch, getState) => {

  const { polls } = getState();

  const index = polls.indexOf(id);

  const body = {
    method: "POST",
    body: { poll: id },
    headers: new Headers({ "Content-Type": "application/json" })
  };

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

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON("/api/view/delete-poll", body)
    .then(success)
    .catch(failure);

};

//view remove option

const viewRemoveOption = (id, text) => (dispatch) => {

  const body = {
    method: "POST",
    body: {
      poll: id,
      text
    },
    headers: new Headers({ "Content-Type": "application/json" })
  };

  const success = (res) => {
    dispatch(metaSetState(res));
  };

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON("/api/view/remove-option", body)
    .then(success)
    .catch(failure);

};

//view toggle private

const viewTogglePrivate = (id) => (dispatch) => {

  const body = {
    method: "POST",
    body: { poll: id },
    headers: new Headers({ "Content-Type": "application/json" })
  };

  const success = (res) => {
    dispatch(metaSetState(res));
  };

  const failure = (err) => {
    dispatch(metaAddErrors([err.message]));
  };

  return getJSON("/api/view/toggle-private", body)
    .then(success)
    .catch(failure);

};

//exports

module.exports = {
  viewAddOption,
  viewCastVote,
  viewDeletePoll,
  viewRemoveOption,
  viewTogglePrivate
};
