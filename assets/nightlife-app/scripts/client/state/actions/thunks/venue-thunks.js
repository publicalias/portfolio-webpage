"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//venue get data

const venueGetData = (params, id, length) => (dispatch) => {

  const args = {
    path: "/nightlife-app/api/venue-get-data",
    method: "GET",
    data: {
      params,
      id,
      length
    }
  };

  return reduxAPICall(dispatch, args);

};

//exports

module.exports = { venueGetData };
