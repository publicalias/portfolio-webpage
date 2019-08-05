"use strict";

//global imports

const { sendData } = require("server-utils");

//node modules

const express = require("express");

const router = express.Router();

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__build}/twitch-viewer/view.html`);
});

//get api

router.get("/:type", (req, res) => {

  const twitchAPI = (type) => `https://api.twitch.tv/kraken/${type}/${req.query[type]}?client_id=${process.env.API_TW_ID}`;

  sendData(twitchAPI(req.params.type), res);

});

//exports

module.exports = router;
