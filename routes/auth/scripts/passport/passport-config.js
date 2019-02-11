"use strict";

//local imports

const { findByID } = require("./passport-callback");

//node modules

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

//utilities

const usersCol = () => db.collection("auth/users");

const getURL = (str) => `${process.env.OA_CB_DOMAIN}/auth/${str}/callback`;

//passport

passport.use(new FacebookStrategy({
  clientID: process.env.OA_FB_ID,
  clientSecret: process.env.OA_FB_SECRET,
  callbackURL: getURL("facebook"),
  profileFields: ["displayName", "email"]
}, findByID));

passport.use(new GitHubStrategy({
  clientID: process.env.OA_GH_ID,
  clientSecret: process.env.OA_GH_SECRET,
  callbackURL: getURL("github"),
  scope: "user:email"
}, findByID));

passport.use(new TwitterStrategy({
  consumerKey: process.env.OA_TT_ID,
  consumerSecret: process.env.OA_TT_SECRET,
  callbackURL: getURL("twitter"),
  includeEmail: true
}, findByID));

passport.serializeUser((user, fn) => {
  fn(null, user.id);
});

passport.deserializeUser((id, fn) => {
  usersCol().findOne({ id }, fn);
});

//providers

const providers = ["facebook", "github", "twitter"];

//exports

module.exports = {
  passport,
  providers
};
