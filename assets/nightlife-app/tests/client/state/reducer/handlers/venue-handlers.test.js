"use strict";

//local imports

const { newState } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//venue clear state

test("reducer accepts VENUE_CLEAR_STATE actions", () => {

  const { venueClearState } = actions;

  testReducer(venueClearState(), {
    venues: {
      data: [{}],
      list: { search: "Coffee" },
      view: {
        form: true,
        time: "9:00 PM",
        message: "Message"
      }
    }
  }, {
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

  testReducer(venueSetTime("9:00 PM"), null, { venues: { page: { time: "9:00 PM" } } });

});

//venue set message

test("reducer accepts VENUE_SET_MESSAGE actions", () => {

  const { venueSetMessage } = actions;

  testReducer(venueSetMessage("Message"), null, { venues: { page: { message: "Message" } } });

});

//venue toggle form

test("reducer accepts VENUE_TOGGLE_FORM actions", () => {

  const { venueToggleForm } = actions;

  testReducer(venueToggleForm(), null, { venues: { page: { form: true } } });

});

//venue toggle range

test("reducer accepts VENUE_TOGGLE_RANGE actions", () => {

  const { venueToggleRange } = actions;

  testReducer(venueToggleRange(), { venues: { list: { sort: true } } }, {
    venues: {
      list: {
        range: true,
        sort: false
      }
    }
  });

});

//venue toggle sort

test("reducer accepts VENUE_TOGGLE_SORT actions", () => {

  const { venueToggleSort } = actions;

  testReducer(venueToggleSort(), { venues: { list: { range: true } } }, {
    venues: {
      list: {
        range: false,
        sort: true
      }
    }
  });

});
