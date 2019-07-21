"use strict";

//local imports

const apiRouter = require("./scripts/server/api/api");

//global imports

const { handleSession } = require(`${__scripts}/redux-utils/server-utils`);

//node modules

const bodyParser = require("body-parser");
const express = require("express");

const router = express.Router();

//middleware

router.use(bodyParser.json());
router.use(express.static("build"));

handleSession(router);

//api handlers

router.use("/api", apiRouter);

//react router

const pages = ["/", "/form", "/list", "/view"];

router.get(pages, (req, res) => {
  req.session.redirect = "/voting-app";
  res.sendFile(`${__build}/voting-app/view.html`);
});

//exports

module.exports = router;
