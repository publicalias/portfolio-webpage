"use strict";

//local imports

const { newState } = require("../../../../../schemas");

//global imports

const { deepCopy } = require("all/utilities");

//venue clear state

const VENUE_CLEAR_STATE = (state) => deepCopy(state, {
  data: { venues: [] },
  venues: newState().venues
});

//venue set search

const VENUE_SET_SEARCH = (state, { search }) => deepCopy(state, { venues: { list: { search } } });

//venue set time

const VENUE_SET_TIME = (state, { time }) => deepCopy(state, { venues: { page: { time } } });

//venue set message

const VENUE_SET_MESSAGE = (state, { message }) => deepCopy(state, { venues: { page: { message } } });

//venue toggle form

const VENUE_TOGGLE_FORM = (state) => deepCopy(state, { venues: { page: { form: !state.venues.page.form } } });

//exports

module.exports = {
  VENUE_CLEAR_STATE,
  VENUE_SET_SEARCH,
  VENUE_SET_TIME,
  VENUE_SET_MESSAGE,
  VENUE_TOGGLE_FORM
};
