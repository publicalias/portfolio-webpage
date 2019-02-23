"use strict";

//local imports

const apiRouter = require("./scripts/api/api");

//global imports

const { handleSession } = require(`${__rootdir}/master/scripts/server-utils`);

//node modules

const bodyParser = require("body-parser");
const express = require("express");

const router = express.Router();

//middleware

router.use(bodyParser.json());
router.use(express.static("build"));

handleSession(router);

router.use("/api", apiRouter);

//react router

router.get("/*", (req, res) => {
  req.session.redirect = "/voting-app";
  res.sendFile(`${__rootdir}/build/voting-app/view.html`);
});

//exports

module.exports = router;
