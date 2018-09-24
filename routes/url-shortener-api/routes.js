"use strict";

//local imports

const { parseInput } = require("./scripts/app-logic");

//node modules

const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const router = express.Router();

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__dirname.replace("routes", "build")}/view.html`);
});

//parse url or code

router.get("/*", (req, res) => {
  MongoClient.connect(process.env.MLAB, parseInput(req, res));
});

//exports

module.exports = router;
