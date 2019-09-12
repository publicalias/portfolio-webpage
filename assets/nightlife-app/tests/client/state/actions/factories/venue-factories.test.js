"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");

//venue clear state

test("venueClearState creates VENUE_CLEAR_STATE actions", () => {

  const { venueClearState } = actions;

  expect(venueClearState()).toEqual({ type: "VENUE_CLEAR_STATE" });

});

//venue set search

test("venueSetSearch creates VENUE_SET_SEARCH actions", () => {

  const { venueSetSearch } = actions;

  expect(venueSetSearch("")).toEqual({
    type: "VENUE_SET_SEARCH",
    search: ""
  });

});

//venue set time

test("venueSetTime creates VENUE_SET_TIME actions", () => {

  const { venueSetTime } = actions;

  expect(venueSetTime("")).toEqual({
    type: "VENUE_SET_TIME",
    time: ""
  });

});

//venue set message

test("venueSetMessage creates VENUE_SET_MESSAGE actions", () => {

  const { venueSetMessage } = actions;

  expect(venueSetMessage("")).toEqual({
    type: "VENUE_SET_MESSAGE",
    message: ""
  });

});

//venue toggle form

test("venueToggleForm creates VENUE_TOGGLE_FORM actions", () => {

  const { venueToggleForm } = actions;

  expect(venueToggleForm()).toEqual({ type: "VENUE_TOGGLE_FORM" });

});