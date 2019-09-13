"use strict";

//global imports

const { sendData } = require("all/server-utils");

//node modules

const express = require("express");

const router = express.Router();

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__build}/orthographic-projection/view.html`);
});

//get api

router.get("/address", (req, res) => {

  const api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.lat},${req.query.lon}&key=${process.env.API_GC_KEY_1}`;

  sendData(api, res);

});

//exports

module.exports = router;
