"use strict";

//global imports

const { capitalize } = require("all/utilities");
const { newIPUser } = require("redux/schemas");

//node modules

const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const uuid = require("uuid/v1");

//utilities

const usersCol = () => db.collection("auth/users");

//api router

const apiRouter = (handlers) => {

  const router = express.Router();

  const apiRequest = async (req, res) => {

    const handler = req.params.action.split("-")
      .map((e, i) => i === 0 ? e : `${capitalize(e)}`)
      .join("");

    try {
      await handlers[handler](req, res);
    } catch {
      res.sendStatus(500);
    }

  };

  router.post("/:action", apiRequest);
  router.get("/:action", apiRequest);
  router.patch("/:action", apiRequest);
  router.delete("/:action", apiRequest);

  return router;

};

//get ip user

const getIPUser = (ip) => usersCol().findOne({
  ip: {
    $exists: true,
    $eq: ip
  }
});

//get or set user

const setIPUser = async (ip) => {

  await usersCol().insertOne(newIPUser({
    id: uuid(),
    ip
  }));

  return getIPUser(ip);

};

const getOrSetUser = async (user, ip) => user || await getIPUser(ip) || setIPUser(ip);

//handle api call

const handleAPICall = (handlers) => (req, res) => Object.values(handlers).reduce(async (acc, e) => {

  const output = await acc; //sends res

  return !res.headersSent && e(req, res, output);

}, null);

//handle auth fail

const handleAuthFail = (req, res, forbid) => {
  if (!req.user) {
    res.sendStatus(401);
  } else if (req.user.data.restricted || forbid && forbid(req.user.id)) {
    res.sendStatus(403);
  }
};

//handle errors

const handleErrors = (res, errors) => {
  if (errors.length) {
    res.json({ errors });
  }
};

//handle session

const sessionConfig = () => session({
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: "auto"
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
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

//exports

module.exports = {
  apiRouter,
  getIPUser,
  getOrSetUser,
  handleAPICall,
  handleAuthFail,
  handleErrors,
  handleSession
};
