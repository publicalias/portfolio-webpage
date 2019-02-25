"use strict";

//node modules

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const request = require("request-promise-native");
const uuid = require("uuid/v1");

//utilities

const usersCol = () => db.collection("auth/users");

//get ip user

const getIPUser = (ip) => usersCol().findOne({ ip });

//handle session

const sessionConfig = () => session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.OA_ES_SECRET,
  store: new MongoDBStore({
    uri: process.env.DB_URL,
    collection: "auth/sessions"
  }, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  })
});

const handleSession = (router) => {
  router.use(sessionConfig());
  router.use(passport.initialize());
  router.use(passport.session());
};

//send data

const sendData = async (api, res) => {
  try {

    const data = await request(api);

    res.send(data);

  } catch (err) {
    res.sendStatus(502);
  }
};

//set ip user

const setIPUser = async (ip) => {

  await usersCol().insertOne({
    id: uuid(),
    type: "ip",
    ip
  });

  return getIPUser(ip);

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
  getIPUser,
  handleSession,
  sendData,
  setIPUser,
  toPromise
};
