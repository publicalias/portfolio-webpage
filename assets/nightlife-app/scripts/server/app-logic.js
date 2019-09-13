"use strict";

const { newGeoPoint } = require("../../schemas");

//global imports

const { handleAuthFail } = require("redux/server-utils");

//node modules

const request = require("request-promise-native");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");

//geo code

const geoCode = async (address) => {
  try {

    if (address) {

      const res = await request(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.replace(/\s/gu, "+")}&key=${process.env.API_GC_KEY_2}`);

      const { lat, lng } = JSON.parse(res).results[0].geometry.location;

      return newGeoPoint({ coordinates: [lng, lat] });

    }

    return null;

  } catch {
    return null;
  }
};

//handle auth friend

const handleAuthFriend = (allowFrom, allowTo) => async (req, res) => {

  const { id } = req.body.data || JSON.parse(req.query.data);

  const { from, to } = await friendsCol().findOne({ id });

  handleAuthFail(req, res, (id) => {

    if (allowFrom && allowTo) {
      return id !== from.id && id !== to.id;
    } else if (allowFrom) {
      return id !== from.id;
    }

    return id !== to.id;

  });

};

//exports

module.exports = {
  geoCode,
  handleAuthFriend
};
