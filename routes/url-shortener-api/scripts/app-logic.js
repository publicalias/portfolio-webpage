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

const insertObj = (res, input, code) => {
  urlsCol()
    .insertOne(createRes(input, code)) //mutates object
    .then(() => {
      res.header("Content-Type", "application/json").send(JSON.stringify(createRes(input, code), null, 2));
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

const codifyURL = (res, input, tries = 3) => {

  const code = createCode();

  urlsCol()
    .findOne({ code })
    .then((doc) => {
      if (doc) {
        if (tries) {
          codifyURL(res, input, tries - 1);
        } else {
          res.sendStatus(500);
        }
      } else {
        insertObj(res, input, code);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });

};

const parseURL = (res, input) => {
  urlsCol()
    .findOne({ url: input }, { projection: { _id: false } })
    .then((doc) => {
      if (doc) {
        res.header("Content-Type", "application/json").send(JSON.stringify(doc, null, 2));
      } else {
        codifyURL(res, input);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

const parseCode = (res, input) => {
  urlsCol()
    .findOne({ code: input })
    .then((doc) => {
      if (doc) {
        res.redirect(doc.url);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
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
