"use strict";

//handle upload

const handleUpload = (req, res) => {

  if (!req.file) {

    res.sendStatus(400);

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

//exports

module.exports = { handleUpload };
