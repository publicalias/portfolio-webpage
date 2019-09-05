"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//venue get data

const venueGetData = (params, id, length) => (dispatch) => reduxAPICall(dispatch, {
  path: "/nightlife-app/api/venue-get-data",
  method: "GET",
  data: {
    params,
    id,
    length
  }
});

//exports

module.exports = { venueGetData };
