"use strict";

//local imports

const { handleUpload } = require("./scripts/app-logic");

//global imports

const { toPromise } = require(`${__scripts}/server-utils`);

//node modules

const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ limits: { fileSize: 2 ** 20 } }).single("input");

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__build}/file-metadata-api/view.html`);
});

//parse upload

router.post("/output", async (req, res) => {
  try {

    await toPromise(upload, req, res);

    handleUpload(req, res);

  } catch {
    res.sendStatus(413);
  }
});

//exports

module.exports = router;
