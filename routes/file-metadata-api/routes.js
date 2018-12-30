"use strict";

//node modules

const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ limits: { fileSize: Math.pow(2, 20) } }).single("input");

//utilities

const handleUpload = (req, res) => (err) => {

  if (err || !req.file) {

    res.sendStatus(err ? 422 : 400);

    return;

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
  upload(req, res, handleUpload(req, res));
});

//exports

module.exports = router;
