"use strict";

//local imports

const { newState } = require("../../../../../schemas");

//global imports

const { deepCopy } = require("all/utilities");

//venue clear form

const VENUE_CLEAR_FORM = (state) => deepCopy(state, { venues: { page: { form: newState().venues.page.form } } });

//venue clear state

const VENUE_CLEAR_STATE = (state) => deepCopy(state, { venues: newState().venues });

//venue set message

const VENUE_SET_MESSAGE = (state, { message }) => deepCopy(state, { venues: { page: { form: { message } } } });

//venue set pause

const VENUE_SET_PAUSE = (state, { pause }) => deepCopy(state, { venues: { page: { photos: { pause } } } });

//venue set photo

const VENUE_SET_PHOTO = (state, { photo }) => deepCopy(state, { venues: { page: { photos: { photo } } } });

//venue set search

const VENUE_SET_SEARCH = (state, { search }) => deepCopy(state, { venues: { list: { search } } });

//venue set start

const VENUE_SET_START = (state, { start }) => deepCopy(state, { venues: { page: { photos: { start } } } });

//venue set time

const VENUE_SET_TIME = (state, { time }) => deepCopy(state, { venues: { page: { form: { time } } } });

//venue toggle form

const VENUE_TOGGLE_FORM = (state) => deepCopy(state, { venues: { page: { form: { open: !state.venues.page.form.open } } } });

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
  VENUE_CLEAR_FORM,
  VENUE_CLEAR_STATE,
  VENUE_SET_MESSAGE,
  VENUE_SET_PAUSE,
  VENUE_SET_PHOTO,
  VENUE_SET_SEARCH,
  VENUE_SET_START,
  VENUE_SET_TIME,
  VENUE_TOGGLE_FORM,
  VENUE_TOGGLE_RANGE,
  VENUE_TOGGLE_SORT
};
