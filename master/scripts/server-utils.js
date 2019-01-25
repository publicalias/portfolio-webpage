"use strict";

//node modules

const request = require("request-promise-native");

//bad request

const badRequest = (res, def) => (err) => {

  const code = err && parseInt(err.message, 10);

  res.sendStatus(code || def);

};

//send data

const sendData = (api, res) => {
  request(api)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.sendStatus(502);
    });
};

//to promise

const defineArgs = (args) => typeof args[0] === "function" ? {
  fn: args[0],
  params: args.slice(1)
} : {
  obj: args[0],
  fn: args[1],
  params: args.slice(2)
};

const toPromise = (...args) => new Promise((resolve, reject) => {

  const { obj, fn, params } = defineArgs(args);

  const callback = (err, ...res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.length > 1 ? res : res[0]);
    }
  };

  if (obj) {
    obj[fn](...params, callback);
  } else {
    fn(...params, callback);
  }

});

//exports

module.exports = {
  badRequest,
  sendData,
  toPromise
};
