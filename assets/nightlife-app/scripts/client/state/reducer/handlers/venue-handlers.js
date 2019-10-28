"use strict";

//local imports

const { newState } = require("../../../../../schemas");

//global imports

const { deepCopy } = require("all/utilities");

//venue clear state

const VENUE_CLEAR_STATE = (state) => deepCopy(state, { venues: newState().venues });

//venue set search

const VENUE_SET_SEARCH = (state, { search }) => deepCopy(state, { venues: { list: { search } } });

//venue set time

const VENUE_SET_TIME = (state, { time }) => deepCopy(state, { venues: { page: { time } } });

//venue set message

const VENUE_SET_MESSAGE = (state, { message }) => deepCopy(state, { venues: { page: { message } } });

//venue toggle form

const VENUE_TOGGLE_FORM = (state) => deepCopy(state, { venues: { page: { form: !state.venues.page.form } } });

//venue toggle range

const VENUE_TOGGLE_RANGE = (state) => deepCopy(state, {
  venues: {
    list: {
      range: !state.venues.list.range,
      sort: false
    }
  }
});

//venue toggle sort

const VENUE_TOGGLE_SORT = (state) => deepCopy(state, {
  venues: {
    list: {
      range: false,
      sort: !state.venues.list.sort
    }
  }
});

//exports

module.exports = {
  VENUE_CLEAR_STATE,
  VENUE_SET_SEARCH,
  VENUE_SET_TIME,
  VENUE_SET_MESSAGE,
  VENUE_TOGGLE_FORM,
  VENUE_TOGGLE_RANGE,
  VENUE_TOGGLE_SORT
};
