"use strict";

//local imports

const { parseInput } = require("./scripts/app-logic");

//node modules

const express = require("express");

const router = express.Router();

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__rootdir}/build/url-shortener-api/view.html`);
});

//parse url or code

router.get("/*", parseInput);

//exports

module.exports = router;
