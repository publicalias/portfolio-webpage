"use strict";

//local imports

const { parseDate } = require("./scripts/app-logic");

//node modules

const express = require("express");

const router = express.Router();

//middleware

router.use(express.static("build"));

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__build}/timestamp-api/view.html`);
});

//parse date

router.get("/:date", (req, res) => {

  const json = parseDate(req.params.date);

  if (json) {
    res.header("Content-Type", "application/json").send(JSON.stringify(json, null, 2));
  } else {
    res.sendStatus(422);
  }

});

//exports

module.exports = router;
