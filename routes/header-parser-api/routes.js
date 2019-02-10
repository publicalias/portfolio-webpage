"use strict";

//node modules

const express = require("express");
const parser = require("ua-parser-js");

const router = express.Router();

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__rootdir}/build/header-parser-api/view.html`);
});

//parse header

router.get("/header", (req, res) => {

  const ua = parser(req.headers["user-agent"]);

  const json = {
    ip: req.ip,
    language: req.headers["accept-language"].split(",")[0],
    os: `${ua.os.name} ${ua.os.version}`
  };

  res.header("Content-Type", "application/json").send(JSON.stringify(json, null, 2));

});

//exports

module.exports = router;
