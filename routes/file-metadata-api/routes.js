"use strict";

//local imports

const { handleUpload } = require("./scripts/app-logic");

//global imports

const { toPromise } = require(`${__rootdir}/master/scripts/server-utils`);

//node modules

const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ limits: { fileSize: Math.pow(2, 20) } }).single("input");

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__rootdir}/build/file-metadata-api/view.html`);
});

//parse upload

router.post("/output", async (req, res) => {
  try {

    await toPromise(upload, req, res);

    handleUpload(req, res);

  } catch (err) {
    res.sendStatus(413);
  }
});

//exports

module.exports = router;
