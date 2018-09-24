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

router.get("/:type", (req, res) => {

  const twitchAPI = {
    channels: `https://api.twitch.tv/kraken/channels/${req.query.channel}?client_id=${process.env.TWITCH}`,
    streams: `https://api.twitch.tv/kraken/streams/${req.query.stream}?client_id=${process.env.TWITCH}`
  };

  request(twitchAPI[req.params.type], sendData(res));

});

//exports

module.exports = router;
