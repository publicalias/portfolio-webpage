"use strict";

//local imports

const { handleForm } = require("./scripts/server/app-logic");

//node modules

const bodyParser = require("body-parser");
const express = require("express");

const router = express.Router();

//middleware

router.use(bodyParser.json());

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__build}/portfolio-webpage/view.html`);
});

//contact form

router.post("/contact", handleForm);

//exports

module.exports = router;
