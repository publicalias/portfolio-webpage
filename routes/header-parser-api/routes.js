"use strict";

//node modules

const express = require("express");
const parser = require("ua-parser-js");

const router = express.Router();

//utilities

const parseHeader = (req) => {

  const ua = parser(req.headers["user-agent"]);

  return {
    ip: req.ip,
    language: req.headers["accept-language"].split(",")[0],
    os: `${ua.os.name} ${ua.os.version}`
  };

};

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__rootdir}/build/header-parser-api/view.html`);
});

//parse header

router.get("/header", (req, res) => {
  res.header("Content-Type", "application/json").send(JSON.stringify(parseHeader(req), null, 2));
});

//exports

module.exports = router;
