"use strict";

//local imports

const { newListParamsVenues } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//venue get item

describe("venueGetItem", () => {

  const { venueGetItem } = actions;

  testAPI.default(venueGetItem(""), {
    path: "/nightlife-app/api/venue-get-item",
    method: "GET",
    data: { id: "" }
  });

});

//venue get list

describe("venueGetList", () => {

  const { venueGetList } = actions;

  const params = newListParamsVenues();

  testAPI.default(venueGetList(params), {
    path: "/nightlife-app/api/venue-get-list",
    method: "GET",
    data: {
      params,
      length: undefined
    }
  });

});
