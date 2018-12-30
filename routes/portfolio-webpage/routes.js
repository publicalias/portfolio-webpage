"use strict";

//local imports

const { sendEmail } = require("./scripts/app-logic");

//node modules

const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const router = express.Router();

//middleware

router.use(bodyParser.json());
router.use(express.static("build"));

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__dirname.replace("routes", "build")}/view.html`);
});

//contact form

router.post("/contact", (req, res) => {

  const recaptchaAPI = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.API_RC_KEY}&response=${req.body.verify}&remoteip=${req.ip}`;

  request.post(recaptchaAPI, sendEmail(req, res));

});

//exports

module.exports = router;
