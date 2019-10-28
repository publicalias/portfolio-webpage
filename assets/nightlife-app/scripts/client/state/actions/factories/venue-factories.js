"use strict";

//venue clear state

const venueClearState = () => ({ type: "VENUE_CLEAR_STATE" });

//venue set search

const venueSetSearch = (search) => ({
  type: "VENUE_SET_SEARCH",
  search
});

//venue set time

const venueSetTime = (time) => ({
  type: "VENUE_SET_TIME",
  time
});

//venue set message

const venueSetMessage = (message) => ({
  type: "VENUE_SET_MESSAGE",
  message
});

//venue toggle form

const venueToggleForm = () => ({ type: "VENUE_TOGGLE_FORM" });

//venue toggle range

const venueToggleRange = () => ({ type: "VENUE_TOGGLE_RANGE" });

//venue toggle sort

const venueToggleSort = () => ({ type: "VENUE_TOGGLE_SORT" });

//exports

module.exports = {
  venueClearState,
  venueSetSearch,
  venueSetTime,
  venueSetMessage,
  venueToggleForm,
  venueToggleRange,
  venueToggleSort
};
