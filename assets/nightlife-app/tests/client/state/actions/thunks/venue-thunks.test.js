"use strict";

//local imports

const { newListParamsVenues } = require("../../../../../schemas");
const { actions } = require("../../../../../scripts/client/state/actions/actions");
const { testAPI } = require("../../../test-helpers");

//venue get data

describe("venueGetData", () => {

  const { venueGetData } = actions;

  const params = newListParamsVenues();

  testAPI.default(venueGetData(params), {
    path: "/nightlife-app/api/venue-get-data",
    method: "GET",
    data: {
      params,
      id: undefined,
      length: undefined
    }
  });

});
