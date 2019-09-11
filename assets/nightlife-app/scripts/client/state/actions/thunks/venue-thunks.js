"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//venue get item

const venueGetItem = (id) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/venue-get-item",
  method: "GET",
  data: { id }
});

//venue get list

const venueGetList = (params, length) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/venue-get-list",
  method: "GET",
  data: {
    params,
    length
  }
});

//exports

module.exports = {
  venueGetItem,
  venueGetList
};
