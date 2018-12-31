"use strict";

//global imports

const { rngInt } = require(`${__rootdir}/master/scripts/utilities`);

//node modules

const valid = require("valid-url");

//utilities

const statusObj = (http, data = null) => ({
  http,
  data
});

const createRes = (url, code) => ({
  url,
  code
});

//parse input

const respondWith = (res, client) => (status) => {

  if (status.http >= 400) {
    res.sendStatus(status.http);
  } else if (status.http >= 300) {
    res.redirect(status.data);
  } else {
    res.header("Content-Type", "application/json").send(JSON.stringify(status.data, null, 2));
  }

  client.close();

};

const parseCode = (input, client) => (status) => new Promise((resolve, reject) => {

  const isValid = /^[a-z]{3}$/iu.test(input);

  if (isValid) {
    client.db()
      .collection("url-shortener-api/urls")
      .findOne({ code: input }, (err, doc) => {
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

const codifyURL = (input, client, tries) => new Promise((resolve, reject) => {

  const code = createCode();

  client.db()
    .collection("url-shortener-api/urls")
    .findOne({ code }, (err, doc) => {
      if (err) {
        reject(statusObj(500));
      } else if (doc) {
        if (tries) {
          resolve(codifyURL(input, client, tries - 1));
        } else {
          reject(statusObj(500));
        }
      } else {

        client.db()
          .collection("url-shortener-api/urls")
          .insertOne(createRes(input, code)); //mutates object

        resolve(statusObj(201, createRes(input, code)));

      }
    });

});

const parseURL = (input, client) => (status) => new Promise((resolve, reject) => {

  const isValid = valid.isWebUri(input);

  if (isValid) {
    client.db()
      .collection("url-shortener-api/urls")
      .findOne({ url: input }, (err, doc) => {
        if (err) {
          reject(statusObj(500));
        } else if (doc) {
          resolve(statusObj(200, createRes(input, doc.code)));
        } else {
          resolve(codifyURL(input, client, 5));
        }
      });
  } else {
    resolve(status);
  }

});

const parseInput = (req, res) => (err, client) => {

  if (err) {

    res.sendStatus(500);

    return;

  }

  const query = req._parsedUrl.search;
  const input = req.params[0] + (query ? query : "");

  const respond = respondWith(res, client);

  parseCode(input, client)(statusObj(422))
    .then(parseURL(input, client))
    .then(respond)
    .catch(respond);

};

//exports

module.exports = { parseInput };
