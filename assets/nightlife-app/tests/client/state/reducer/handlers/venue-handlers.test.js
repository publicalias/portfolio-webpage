"use strict";

//local imports

const { newState } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//venue clear state

test("reducer accepts VENUE_CLEAR_STATE actions", () => {

  const { venueClearState } = actions;

  testReducer(venueClearState(), {
    page: { venues: [{}] },
    venues: {
      list: { search: "Coffee" },
      view: {
        form: true,
        time: "12:00",
        message: "N/A"
      }
    }
  }, {
    page: { venues: [] },
    venues: newState().venues
  });

});

//venue set search

test("reducer accepts VENUE_SET_SEARCH actions", () => {

  const { venueSetSearch } = actions;

  testReducer(venueSetSearch("Coffee"), null, { venues: { list: { search: "Coffee" } } });

});

//venue set time

test("reducer accepts VENUE_SET_TIME actions", () => {

  const { venueSetTime } = actions;

  testReducer(venueSetTime("12:00"), null, { venues: { view: { time: "12:00" } } });

});

//venue set message

test("reducer accepts VENUE_SET_MESSAGE actions", () => {

  const { venueSetMessage } = actions;

  testReducer(venueSetMessage("N/A"), null, { venues: { view: { message: "N/A" } } });

});

//venue toggle form

test("reducer accepts VENUE_TOGGLE_FORM actions", () => {

  const { venueToggleForm } = actions;

  testReducer(venueToggleForm(), null, { venues: { view: { form: true } } });

});
