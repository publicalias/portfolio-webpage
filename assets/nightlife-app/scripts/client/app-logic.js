"use strict";

//local imports

const { newGeoPoint, newListParamsUsers, newListParamsVenues } = require("../../schemas");

//global imports

const { get } = require("all/utilities");
const { getSearchParams, setSearchParams } = require("redux/client-utils");

//get location

const getLocation = (user = {}) => get(user, "data.address")
  ? get(user, "data.location")
  : new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lon } }) => {
      resolve(newGeoPoint({ coordinates: [lon, lat] }));
    }, () => {
      resolve(null);
    });
  });

//get user params

const getUserParams = (location) => getSearchParams(newListParamsUsers, location);

//get venue params

const getVenueParams = (location) => getSearchParams(newListParamsVenues, location);

//set user params

const setUserParams = setSearchParams;

//set venue params

const setVenueParams = setSearchParams;

//exports

module.exports = {
  getLocation,
  getUserParams,
  getVenueParams,
  setUserParams,
  setVenueParams
};
