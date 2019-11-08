"use strict";

//local imports

const { actions } = require("../../../../../scripts/client/state/actions/actions");

//venue clear form

test("venueClearForm creates VENUE_CLEAR_FORM actions", () => {

  const { venueClearForm } = actions;

  expect(venueClearForm()).toEqual({ type: "VENUE_CLEAR_FORM" });

});

//venue clear state

test("venueClearState creates VENUE_CLEAR_STATE actions", () => {

  const { venueClearState } = actions;

  expect(venueClearState()).toEqual({ type: "VENUE_CLEAR_STATE" });

});

//venue set message

test("venueSetMessage creates VENUE_SET_MESSAGE actions", () => {

  const { venueSetMessage } = actions;

  expect(venueSetMessage("")).toEqual({
    type: "VENUE_SET_MESSAGE",
    message: ""
  });

});

//venue set pause

test("venueSetPause creates VENUE_SET_PAUSE actions", () => {

  const { venueSetPause } = actions;

  expect(venueSetPause(true)).toEqual({
    type: "VENUE_SET_PAUSE",
    pause: true
  });

});

//venue set photo

test("venueSetPhoto creates VENUE_SET_PHOTO actions", () => {

  const { venueSetPhoto } = actions;

  expect(venueSetPhoto("")).toEqual({
    type: "VENUE_SET_PHOTO",
    photo: ""
  });

});

//venue set search

test("venueSetSearch creates VENUE_SET_SEARCH actions", () => {

  const { venueSetSearch } = actions;

  expect(venueSetSearch("")).toEqual({
    type: "VENUE_SET_SEARCH",
    search: ""
  });

});

//venue set start

test("venueSetStart creates VENUE_SET_START actions", () => {

  const { venueSetStart } = actions;

  expect(venueSetStart(true)).toEqual({
    type: "VENUE_SET_START",
    start: true
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

//venue toggle form

test("venueToggleForm creates VENUE_TOGGLE_FORM actions", () => {

  const { venueToggleForm } = actions;

  expect(venueToggleForm()).toEqual({ type: "VENUE_TOGGLE_FORM" });

});

//venue toggle range

test("venueToggleRange creates VENUE_TOGGLE_RANGE actions", () => {

  const { venueToggleRange } = actions;

  expect(venueToggleRange()).toEqual({ type: "VENUE_TOGGLE_RANGE" });

});

//venue toggle sort

test("venueToggleSort creates VENUE_TOGGLE_SORT actions", () => {

  const { venueToggleSort } = actions;

  expect(venueToggleSort()).toEqual({ type: "VENUE_TOGGLE_SORT" });

});
