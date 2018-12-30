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

  const { view } = getState();

  const body = {
    poll: id,
    text: view.add
  };

  const success = (res) => {

    const { polls, errors } = res;

    dispatch(errors ? metaAddErrors(errors) : metaSetState({ polls }));

  };

  return reduxAPICall(dispatch, "/api/view/add-option", body, success);

};

//view cast vote

const viewCastVote = (id, text) => (dispatch) => {

  const body = {
    poll: id,
    text
  };

  return reduxAPICall(dispatch, "/api/view/cast-vote", body);

};

//view delete poll

const viewDeletePoll = (id) => (dispatch, getState) => {

  const { polls } = getState();

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

  return reduxAPICall(dispatch, "/api/view/delete-poll", { poll: id }, success);

};

//view remove option

const viewRemoveOption = (id, text) => (dispatch) => {

  const body = {
    poll: id,
    text
  };

  return reduxAPICall(dispatch, "/api/view/remove-option", body);

};

//view toggle private

const viewTogglePrivate = (id) => (dispatch) => reduxAPICall(dispatch, "/api/view/toggle-private", { poll: id });

//exports

module.exports = {
  viewAddOption,
  viewCastVote,
  viewDeletePoll,
  viewRemoveOption,
  viewTogglePrivate
};
