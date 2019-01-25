"use strict";

//local imports

const { sendEmail, sendRes, validateUser } = require("./scripts/app-logic");

//global imports

const { badRequest } = require(`${__rootdir}/master/scripts/server-utils`);

//node modules

const bodyParser = require("body-parser");
const express = require("express");
const request = require("request-promise-native");

const router = express.Router();

//middleware

router.use(bodyParser.json());
router.use(express.static("build"));

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__rootdir}/build/portfolio-webpage/view.html`);
});

//contact form

router.post("/contact", (req, res) => {

  const options = {
    method: "POST",
    uri: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.API_RC_KEY}&response=${req.body.verify}&remoteip=${req.ip}`
  };

  request(options)
    .then(validateUser)
    .then(sendEmail(req))
    .then(sendRes(res))
    .catch(badRequest(res, 502));

});

//exports

module.exports = router;
