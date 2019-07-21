"use strict";

//node modules

const express = require("express");

const router = express.Router();

//middleware

router.use(express.static("build"));

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__build}/book-trading-club/view.html`);
});

//exports

module.exports = router;
