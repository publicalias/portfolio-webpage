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
  res.sendFile(`${__rootdir}/build/twitch-viewer/view.html`);
});

//get api

router.get("/:type", (req, res) => {

  const twitchAPI = (type) => `https://api.twitch.tv/kraken/${type}/${req.query[type]}?client_id=${process.env.API_TW_ID}`;

  request(twitchAPI(req.params.type), sendData(res));

});

//exports

module.exports = router;
