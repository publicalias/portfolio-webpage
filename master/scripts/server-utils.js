"use strict";

//node modules

const request = require("request-promise-native");

//send data

const sendData = async (api, res) => {
  try {

    const data = await request(api);

    res.send(data);

  } catch (err) {
    res.sendStatus(502);
  }
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
  sendData,
  toPromise
};
