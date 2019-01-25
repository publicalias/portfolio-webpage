"use strict";

//global imports

const { sendData } = require(`${__rootdir}/master/scripts/server-utils`);

//node modules

const express = require("express");

const router = express.Router();

//middleware

router.use(express.static("build"));

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__rootdir}/build/orthographic-projection/view.html`);
});

//get api

router.get("/address", (req, res) => {

  const api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.lat},${req.query.lon}&key=${process.env.API_GC_KEY}`;

  sendData(api, res);

});

//exports

module.exports = router;
