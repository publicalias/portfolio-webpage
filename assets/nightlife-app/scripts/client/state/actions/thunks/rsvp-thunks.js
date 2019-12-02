"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//rsvp add

const rsvpAdd = (name, id, time, message) => reduxAPICall({
  type: "RSVP_ADD",
  path: "/nightlife-app/api/rsvp-add",
  method: "POST",
  data: {
    name,
    id,
    time,
    message
  }
});

//rsvp dismiss

const rsvpDismiss = (id) => reduxAPICall({
  type: "RSVP_DISMISS",
  path: "/nightlife-app/api/rsvp-dismiss",
  method: "PATCH",
  data: { id }
});

//rsvp get list

const rsvpGetList = () => reduxAPICall({
  type: "RSVP_GET_LIST",
  path: "/nightlife-app/api/rsvp-get-list",
  method: "GET"
});

//rsvp remove

const rsvpRemove = (id) => reduxAPICall({
  type: "RSVP_REMOVE",
  path: "/nightlife-app/api/rsvp-remove",
  method: "DELETE",
  data: { id }
});

//exports

module.exports = {
  rsvpAdd,
  rsvpDismiss,
  rsvpGetList,
  rsvpRemove
};
