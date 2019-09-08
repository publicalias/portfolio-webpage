"use strict";

//global imports

const { newIPUser } = require("redux/schemas");

//node modules

const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const uuid = require("uuid/v1");

//utilities

const usersCol = () => db.collection("auth/users");

//api handler

const apiHandler = (handlers) => {

  const router = express.Router();

  const apiRequest = async (req, res) => {

    const handler = req.params.action.split("-")
      .map((e, i) => i === 0 ? e : `${e[0].toUpperCase()}${e.slice(1)}`)
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

//auth fail

const authFail = (req, res, forbid) => {
  if (!req.user || req.user.data.restricted || forbid && forbid(req.user.id)) {

    res.sendStatus(401);

    return true;

  }
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

const getOrSetUser = async (req) => {

  const user = req.user || await getIPUser(req.ip) || await setIPUser(req.ip);

  return user;

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
  apiHandler,
  authFail,
  getIPUser,
  getOrSetUser,
  handleSession
};
