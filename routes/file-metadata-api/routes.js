"use strict";

//global imports

const { badRequest, toPromise } = require(`${__rootdir}/master/scripts/server-utils`);

//node modules

const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ limits: { fileSize: Math.pow(2, 20) } }).single("input");

//utilities

const handleUpload = (req, res) => () => {

  if (!req.file) {
    throw Error("400 Bad Request");
  }

  const json = {
    name: req.file.originalname,
    size: req.file.size,
    mimeType: req.file.mimetype,
    encoding: req.file.encoding
  };

  res.header("Content-Type", "application/json").send(JSON.stringify(json, null, 2));

};

//home page

router.get("/", (req, res) => {
  res.sendFile(`${__rootdir}/build/file-metadata-api/view.html`);
});

//parse upload

router.post("/output", (req, res) => {
  toPromise(upload, req, res)
    .then(handleUpload(req, res))
    .catch(badRequest(res, 422));
});

//exports

module.exports = router;
