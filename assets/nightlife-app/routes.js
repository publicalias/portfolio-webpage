"use strict";

//local imports

const apiRouter = require("./scripts/server/api/api");

//global imports

const { handleSession } = require("redux/server-utils");

//node modules

const bodyParser = require("body-parser");
const express = require("express");

const router = express.Router();

//middleware

router.use(bodyParser.json());

handleSession(router);

//api handlers

router.use("/api", apiRouter);

//react router

const pages = ["/", "/users/list", "/users/page/:id", "/venues/list", "/venues/page/:id"];

router.get(pages, (req, res) => {
  res.sendFile(`${__build}/nightlife-app/view.html`);
});

//exports

module.exports = router;
