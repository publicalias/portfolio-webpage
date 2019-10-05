"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//venue get item

const venueGetItem = (id, location) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/venue-get-item",
  method: "GET",
  data: {
    id,
    location
  }
});

//venue get list

const venueGetList = (params, length, location) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/venue-get-list",
  method: "GET",
  data: {
    params,
    length,
    location
  }
}, {
  array: false
});

//exports

module.exports = {
  venueGetItem,
  venueGetList
};
