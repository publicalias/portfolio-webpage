"use strict";

//venue clear state

const venueClearState = () => ({ type: "VENUE_CLEAR_STATE" });

//venue set message

const venueSetMessage = (message) => ({
  type: "VENUE_SET_MESSAGE",
  message
});

//venue set pause

const venueSetPause = (pause) => ({
  type: "VENUE_SET_PAUSE",
  pause
});

//venue set photo

const venueSetPhoto = (photo) => ({
  type: "VENUE_SET_PHOTO",
  photo
});

//venue set search

const venueSetSearch = (search) => ({
  type: "VENUE_SET_SEARCH",
  search
});

//venue set start

const venueSetStart = (start) => ({
  type: "VENUE_SET_START",
  start
});

//venue set time

const venueSetTime = (time) => ({
  type: "VENUE_SET_TIME",
  time
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
  venueSetMessage,
  venueSetPause,
  venueSetPhoto,
  venueSetSearch,
  venueSetStart,
  venueSetTime,
  venueToggleForm,
  venueToggleRange,
  venueToggleSort
};
