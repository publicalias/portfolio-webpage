"use strict";

//local imports

const apiRouter = require("./scripts/server/api/api");

//global imports

const { handleSession } = require("redux-utils/server-utils");

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

const pages = ["/", "/form", "/list", "/view/:id"];
const gated = ["/form"];

router.get(pages, (req, res) => {
  if (gated.includes(req.path) && !req.user) {
    res.redirect(`/voting-app?errors=${JSON.stringify(["401 Unauthorized"])}`);
  } else {
    req.session.redirect = "/voting-app";
    res.sendFile(`${__build}/voting-app/view.html`);
  }
});

//exports

module.exports = router;
