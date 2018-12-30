"use strict";

//local imports

const { filterPolls } = require("../../app-logic");
const { initialState } = require("../initial-state");

//global imports

const { cycleItems, initDeepCopy } = require("utilities");

const deepCopy = initDeepCopy();

//view change poll

const VIEW_CHANGE_POLL = (state, { delta }) => {

  const polls = filterPolls(state);
  const last = state.view.poll;

  let next = "";

  if (polls.includes(last)) {
    next = cycleItems(polls, last, delta);
  } else if (polls.length) {
    next = polls[0];
  }

  return deepCopy(state, { view: deepCopy(initialState.view, { poll: next }) });

};

//view set add text

const VIEW_SET_ADD_TEXT = (state, { add }) => deepCopy(state, { view: { add } });

//view toggle confirm

const VIEW_TOGGLE_CONFIRM = (state) => deepCopy(state, { view: { confirm: !state.view.confirm } });

//view toggle settings

const VIEW_TOGGLE_SETTINGS = (state) => deepCopy(state, { view: { settings: !state.view.settings } });

//exports

module.exports = {
  VIEW_CHANGE_POLL,
  VIEW_SET_ADD_TEXT,
  VIEW_TOGGLE_CONFIRM,
  VIEW_TOGGLE_SETTINGS
};
