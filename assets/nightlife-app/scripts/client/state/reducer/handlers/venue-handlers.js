"use strict";

//local imports

const { newState } = require("../../../../../schemas");

//global imports

const { deepCopy } = require("all/utilities");

//venue clear state

const VENUE_CLEAR_STATE = (state) => deepCopy(state, {
  page: { venues: [] },
  venues: newState().venues
});

//venue set search

const VENUE_SET_SEARCH = (state, { search }) => deepCopy(state, { venues: { list: { search } } });

//venue set time

const VENUE_SET_TIME = (state, { time }) => deepCopy(state, { venues: { view: { time } } });

//venue set message

const VENUE_SET_MESSAGE = (state, { message }) => deepCopy(state, { venues: { view: { message } } });

//venue toggle form

const VENUE_TOGGLE_FORM = (state) => deepCopy(state, { venues: { view: { form: !state.venues.view.form } } });

//exports

module.exports = {
  VENUE_CLEAR_STATE,
  VENUE_SET_SEARCH,
  VENUE_SET_TIME,
  VENUE_SET_MESSAGE,
  VENUE_TOGGLE_FORM
};
