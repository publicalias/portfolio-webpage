"use strict";

//local imports

const { newGeoPoint, newListParamsVenues } = require("../../schemas");

//global imports

const { get } = require("all/utilities");
const { getSearchParams } = require("redux/client-utils");

//get venue params

const getVenueParams = (location) => getSearchParams(newListParamsVenues, location);

//get location

const getLocation = (user) => get(user, "data.address")
  ? get(user, "data.location")
  : new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {

      const { coords: { latitude: lat, longitude: lon } } = position;

      resolve(newGeoPoint({ coordinates: [lon, lat] }));

    }, () => {
      resolve(null);
    });
  });

//exports

module.exports = {
  getLocation,
  getVenueParams
};
