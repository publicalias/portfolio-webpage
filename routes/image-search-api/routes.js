"use strict";

//local imports

const { apiHandler, readLogs, startParam, upsertLog } = require("./scripts/app-logic");

//node modules

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const request = require("request");

const router = express.Router();

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__dirname.replace("routes", "build")}/view.html`);
});

//get search results

router.get("/search/:term", (req, res) => {

  const api = `https://www.googleapis.com/customsearch/v1?cx=${encodeURIComponent(process.env.GCSID)}&key=${process.env.GCSKEY}&searchType=image&fields=items(title%2Clink%2Cimage%2FcontextLink)&q=${encodeURIComponent(req.params.term)}${startParam(req.query.offset)}`;

  MongoClient.connect(process.env.MLAB, upsertLog(req));

  request(api, apiHandler(req, res));

});

//get recent searches

router.get("/recent", (req, res) => {
  MongoClient.connect(process.env.MLAB, readLogs(res));
});

//exports

module.exports = router;
