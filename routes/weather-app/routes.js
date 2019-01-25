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
  res.sendFile(`${__rootdir}/build/weather-app/view.html`);
});

//get api

router.get("/weather", (req, res) => {

  const api = `http://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&APPID=${process.env.API_OW_ID}`;

  sendData(api, res);

});

//exports

module.exports = router;
