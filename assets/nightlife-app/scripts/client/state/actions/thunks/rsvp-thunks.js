"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//rsvp add

const rsvpAdd = (name, id, time, message) => (dispatch) => reduxAPICall(dispatch, {
  path: "nightlife-app/api/rsvp-add",
  method: "POST",
  data: {
    name,
    id,
    time,
    message
  }
});

//rsvp dismiss

const rsvpDismiss = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "nightlife-app/api/rsvp-dismiss",
  method: "PATCH",
  data: { id }
});

//rsvp get data

const rsvpGetData = () => (dispatch) => reduxAPICall(dispatch, {
  path: "nightlife-app/api/rsvp-get-data",
  method: "GET"
});

//rsvp remove

const rsvpRemove = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "nightlife-app/api/rsvp-remove",
  method: "DELETE",
  data: { id }
});

//exports

module.exports = {
  rsvpAdd,
  rsvpDismiss,
  rsvpGetData,
  rsvpRemove
};
