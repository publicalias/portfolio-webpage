"use strict";

//global imports

const { reduxAPICall } = require("redux/client-utils");

//venue get item

const venueGetItem = (id, location) => reduxAPICall({
  type: "VENUE_GET_ITEM",
  path: "/nightlife-app/api/venue-get-item",
  method: "GET",
  data: {
    id,
    location
  }
});

//venue get list

const venueGetList = (params, length, location) => reduxAPICall({
  type: "VENUE_GET_LIST",
  path: "/nightlife-app/api/venue-get-list",
  method: "GET",
  data: {
    params,
    length,
    location
  }
}, {
  ignoreNull: true,
  overwriteArray: false
});

//exports

module.exports = {
  venueGetItem,
  venueGetList
};
