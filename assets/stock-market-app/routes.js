"use strict";

//node modules

const express = require("express");

const router = express.Router();

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__build}/stock-market-app/view.html`);
});

//exports

module.exports = router;
