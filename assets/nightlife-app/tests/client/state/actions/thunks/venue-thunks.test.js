"use strict";

//local imports

const { newListParamsVenues } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//venue get item

describe("venueGetItem", () => {

  const { venueGetItem } = actions;

  testAPI.default(venueGetItem("", null), {
    path: "/nightlife-app/api/venue-get-item",
    method: "GET",
    data: {
      id: "",
      location: null
    }
  });

});

//venue get list

describe("venueGetList", () => {

  const { venueGetList } = actions;

  const params = newListParamsVenues();

  testAPI.default(venueGetList(params, 0, null), {
    path: "/nightlife-app/api/venue-get-list",
    method: "GET",
    data: {
      params,
      length: 0,
      location: null
    }
  }, {
    ignoreNull: true,
    overwriteArray: false
  });

});
