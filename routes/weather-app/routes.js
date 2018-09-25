"use strict";

//global imports

const { sendData } = require(`${__rootdir}/master/scripts/utilities`);

//node modules

const express = require("express");
const request = require("request");

const router = express.Router();

//middleware

router.use(express.static("build"));

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__dirname.replace("routes", "build")}/view.html`);
});

//get api

router.get("/weather", (req, res) => {

  const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&APPID=${process.env.WEATHER}`;

  request(weatherAPI, sendData(res));

});

//exports

module.exports = router;
