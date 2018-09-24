"use strict";

//global imports

const { sendData } = require(`${__rootdir}/master/scripts/utilities`);

//node modules

const express = require("express");
const request = require("request");

const router = express.Router();

//utilities

const getWeather = (res) => (err, status, body) => {
  if (err) {
    res.sendStatus(502);
  } else {

    const { lat, lon } = JSON.parse(body);

    const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${process.env.WEATHER}`;

    request(weatherAPI, sendData(res));

  }
};

//middleware

router.use(express.static("build"));

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__dirname.replace("routes", "build")}/view.html`);
});

//get api

router.get("/weather", (req, res) => {

  const ipAPI = `http://ip-api.com/json/${req.ip}`;

  request(ipAPI, getWeather(res));

});

//exports

module.exports = router;
