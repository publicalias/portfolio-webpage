"use strict";

//local imports

const { newState } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testReducer } = require("../../../test-helpers");

//venue clear form

test("reducer accepts VENUE_CLEAR_FORM actions", () => {

  const { venueClearForm } = actions;

  testReducer(venueClearForm(), {
    venues: {
      page: {
        form: {
          open: true,
          time: "9:00 PM",
          message: "Message"
        }
      }
    }
  }, {
    venues: newState().venues
  });

});

//venue clear state

test("reducer accepts VENUE_CLEAR_STATE actions", () => {

  const { venueClearState } = actions;

  testReducer(venueClearState(), {
    venues: {
      list: {
        data: [{}],
        menu: {
          range: true,
          search: "Coffee",
          sort: true
        }
      },
      page: {
        data: [{}],
        body: {
          photo: "https://www.example.com/photo.jpg",
          pause: true,
          start: true
        },
        form: {
          open: true,
          time: "9:00 PM",
          message: "Message"
        }
      }
    }
  }, {
    venues: newState().venues
  });

});

//venue set message

test("reducer accepts VENUE_SET_MESSAGE actions", () => {

  const { venueSetMessage } = actions;

  testReducer(venueSetMessage("Message"), null, { venues: { page: { form: { message: "Message" } } } });

});

//venue set open

test("reducer accepts VENUE_SET_OPEN actions", () => {

  const { venueSetOpen } = actions;

  testReducer(venueSetOpen(true), null, { venues: { page: { form: { open: true } } } });

});

//venue set pause

test("reducer accepts VENUE_SET_PAUSE actions", () => {

  const { venueSetPause } = actions;

  testReducer(venueSetPause(true), null, { venues: { page: { body: { pause: true } } } });

});

//venue set photo

test("reducer accepts VENUE_SET_PHOTO actions", () => {

  const { venueSetPhoto } = actions;

  const photo = "https://www.example.com/photo.jpg";

  testReducer(venueSetPhoto(photo), null, { venues: { page: { body: { photo } } } });

});

//venue set search

test("reducer accepts VENUE_SET_SEARCH actions", () => {

  const { venueSetSearch } = actions;

  testReducer(venueSetSearch("Coffee"), null, { venues: { list: { menu: { search: "Coffee" } } } });

});

//venue set start

test("reducer accepts VENUE_SET_START actions", () => {

  const { venueSetStart } = actions;

  testReducer(venueSetStart(true), null, { venues: { page: { body: { start: true } } } });

});

//venue set time

test("reducer accepts VENUE_SET_TIME actions", () => {

  const { venueSetTime } = actions;

  testReducer(venueSetTime("9:00 PM"), null, { venues: { page: { form: { time: "9:00 PM" } } } });

});

//venue toggle range

test("reducer accepts VENUE_TOGGLE_RANGE actions", () => {

  const { venueToggleRange } = actions;

  testReducer(venueToggleRange(), { venues: { list: { menu: { sort: true } } } }, {
    venues: {
      list: {
        menu: {
          range: true,
          sort: false
        }
      }
    }
  });

});

//venue toggle sort

test("reducer accepts VENUE_TOGGLE_SORT actions", () => {

  const { venueToggleSort } = actions;

  testReducer(venueToggleSort(), { venues: { list: { menu: { range: true } } } }, {
    venues: {
      list: {
        menu: {
          range: false,
          sort: true
        }
      }
    }
  });

});
