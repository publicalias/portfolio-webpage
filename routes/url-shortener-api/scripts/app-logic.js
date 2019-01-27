"use strict";

//global imports

const { rngInt } = require(`${__rootdir}/master/scripts/utilities`);

//node modules

const valid = require("valid-url");

//utilities

const urlsCol = () => db.collection("url-shortener-api/urls");

const createRes = (url, code) => ({
  url,
  code
});

//parse input

const createCode = () => {

  const char = "abcdefghijklmnopqrstuvwxyz".split("");
  const code = [];

  for (let i = 0; i < 26; i++) {
    char.push(char[i].toUpperCase());
  }

  for (let i = 0; i < 3; i++) {
    code.push(char[rngInt(0, char.length)]);
  }

  return code.join("");

};

const insertObj = async (res, input, code) => {

  await urlsCol().insertOne(createRes(input, code)); //mutates object

  res.header("Content-Type", "application/json").send(JSON.stringify(createRes(input, code), null, 2));

};

const codifyURL = async (res, input, tries = 3) => {

  const code = createCode();

  const doc = await urlsCol().findOne({ code });

  if (doc) {
    if (tries) {
      codifyURL(res, input, tries - 1);
    } else {
      res.sendStatus(500);
    }
  } else {
    insertObj(res, input, code);
  }

};

const parseURL = async (res, input) => {
  try {

    const doc = await urlsCol().findOne({ url: input }, { projection: { _id: false } });

    if (doc) {
      res.header("Content-Type", "application/json").send(JSON.stringify(doc, null, 2));
    } else {
      codifyURL(res, input);
    }

  } catch (err) {
    res.sendStatus(500);
  }
};

const parseCode = async (res, input) => {
  try {

    const doc = await urlsCol().findOne({ code: input });

    if (doc) {
      res.redirect(doc.url);
    } else {
      res.sendStatus(404);
    }

  } catch (err) {
    res.sendStatus(500);
  }
};

const parseInput = (req, res) => {

  const query = req._parsedUrl.search;
  const input = req.params[0] + (query || "");

  if (valid.isWebUri(input)) {
    parseURL(res, input);
  } else if (/^[a-z]{3}$/iu.test(input)) {
    parseCode(res, input);
  } else {
    res.sendStatus(422);
  }

};

//exports

module.exports = { parseInput };
