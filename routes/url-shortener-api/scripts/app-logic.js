"use strict";

//global imports

const { rngInt } = require(`${__rootdir}/master/scripts/utilities`);

//node modules

const valid = require("valid-url");

//utilities

const urlsCol = () => db.collection("url-shortener-api/urls");

const statusObj = (http, data = null) => ({
  http,
  data
});

const createRes = (url, code) => ({
  url,
  code
});

//parse input

const respondWith = (res) => (status) => {
  if (status.http >= 400) {
    res.sendStatus(status.http);
  } else if (status.http >= 300) {
    res.redirect(status.data);
  } else {
    res.header("Content-Type", "application/json").send(JSON.stringify(status.data, null, 2));
  }
};

const parseCode = (input) => (status) => new Promise((resolve, reject) => {

  const isValid = /^[a-z]{3}$/iu.test(input);

  if (isValid) {
    urlsCol().findOne({ code: input }, (err, doc) => {
      if (err) {
        reject(statusObj(500));
      } else if (doc) {
        resolve(statusObj(303, doc.url));
      } else {
        reject(statusObj(404));
      }
    });
  } else {
    resolve(status);
  }

});

const createCode = () => {

  const char = "abcdefghijklmnopqrstuvwxyz".split("");

  for (let i = 0; i < 26; i++) {
    char.push(char[i].toUpperCase());
  }

  const code = [];

  for (let i = 0; i < 3; i++) {
    code.push(char[rngInt(0, char.length)]);
  }

  return code.join("");

};

const insertObj = (input, code) => new Promise((resolve, reject) => {
  urlsCol().insertOne(createRes(input, code), (err) => { //mutates object
    if (err) {
      reject(statusObj(500));
    } else {
      resolve(statusObj(201, createRes(input, code)));
    }
  });
});

const codifyURL = (input, tries) => new Promise((resolve, reject) => {

  const code = createCode();

  urlsCol().findOne({ code }, (err, doc) => {
    if (err) {
      reject(statusObj(500));
    } else if (doc) {
      if (tries) {
        resolve(codifyURL(input, tries - 1));
      } else {
        reject(statusObj(500));
      }
    } else {
      resolve(insertObj(input, code));
    }
  });

});

const parseURL = (input) => (status) => new Promise((resolve, reject) => {

  const isValid = valid.isWebUri(input);

  if (isValid) {
    urlsCol().findOne({ url: input }, (err, doc) => {
      if (err) {
        reject(statusObj(500));
      } else if (doc) {
        resolve(statusObj(200, createRes(input, doc.code)));
      } else {
        resolve(codifyURL(input, 5));
      }
    });
  } else {
    resolve(status);
  }

});

const parseInput = (req, res) => {

  const query = req._parsedUrl.search;
  const input = req.params[0] + (query ? query : "");

  const respond = respondWith(res);

  parseCode(input)(statusObj(422))
    .then(parseURL(input))
    .then(respond)
    .catch(respond);

};

//exports

module.exports = { parseInput };
