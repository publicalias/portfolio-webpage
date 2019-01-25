"use strict";

//local imports

const { apiHandler, readLogs, startParam, upsertLog } = require("./scripts/app-logic");

//global imports

const { badRequest } = require(`${__rootdir}/master/scripts/server-utils`);

//node modules

const express = require("express");
const request = require("request-promise-native");

const router = express.Router();

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__rootdir}/build/image-search-api/view.html`);
});

//get search results

router.get("/search/:term", (req, res) => {

  const api = `https://www.googleapis.com/customsearch/v1?cx=${process.env.API_CS_ID}&key=${process.env.API_CS_KEY}&searchType=image&fields=items(title%2Clink%2Cimage%2FcontextLink)&q=${encodeURIComponent(req.params.term)}${startParam(req.query.offset)}`;

  request(api)
    .then(apiHandler(req, res))
    .catch(badRequest(res, 502));

  upsertLog(req);

});

//get recent searches

router.get("/recent", readLogs);

//exports

module.exports = router;
