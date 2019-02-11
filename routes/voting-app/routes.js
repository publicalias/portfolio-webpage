"use strict";

//global imports

const { handleSession } = require(`${__rootdir}/master/scripts/server-utils`);

//node modules

const express = require("express");

const router = express.Router();

//middleware

router.use(express.static("build"));

handleSession(router);

//react router

router.get("/*", (req, res) => {
  req.session.redirect = "/voting-app";
  res.sendFile(`${__rootdir}/build/voting-app/view.html`);
});

//exports

module.exports = router;
