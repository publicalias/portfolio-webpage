"use strict";

//local imports

const { newGeoPoint } = require("../../schemas");

//global imports

const { get } = require("all/utilities");

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

module.exports = { getLocation };
