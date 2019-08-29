"use strict";

//global imports

const { sendData } = require("all/server-utils");

//node modules

const express = require("express");

const router = express.Router();

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__build}/twitch-viewer/view.html`);
});

//get api

router.get("/:type", (req, res) => {

  const twitchAPI = (type) => ({
    headers: { "Client-ID": process.env.API_TW_ID },
    qs: {
      [type === "users" ? "login" : "user_login"]: JSON.parse(req.query[type])
    },
    uri: `https://api.twitch.tv/helix/${type}`
  });

  sendData(twitchAPI(req.params.type), res);

});

//exports

module.exports = router;
