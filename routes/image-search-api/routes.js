"use strict";

//local imports

const { apiHandler, readLogs, startParam, upsertLog } = require("./scripts/app-logic");

//node modules

const express = require("express");
const request = require("request-promise-native");

const router = express.Router();

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__rootdir}/build/image-search-api/view.html`);
});

//get search results

router.get("/search/:term", async (req, res) => {
  try {

    const [data] = await Promise.all([
      request(`https://www.googleapis.com/customsearch/v1?cx=${process.env.API_CS_ID}&key=${process.env.API_CS_KEY}&searchType=image&fields=items(title%2Clink%2Cimage%2FcontextLink)&q=${encodeURIComponent(req.params.term)}${startParam(req.query.offset)}`),
      upsertLog(req, res)
    ]);

    apiHandler(req, res, data);

  } catch {
    res.sendStatus(500);
  }
});

//get recent searches

router.get("/recent", readLogs);

//exports

module.exports = router;
