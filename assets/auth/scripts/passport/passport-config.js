"use strict";

//local imports

const { findUser } = require("./passport-callback");

//node modules

const passport = require("passport");

const { Strategy: FacebookStrategy } = require("passport-facebook");
const { Strategy: GitHubStrategy } = require("passport-github");
const { Strategy: TwitterStrategy } = require("passport-twitter");

//utilities

const usersCol = () => db.collection("auth/users");

const getURL = (provider) => `${process.env.OA_CB_DOMAIN}/auth/${provider}/callback`;

//passport

passport.use(new FacebookStrategy({
  clientID: process.env.OA_FB_ID,
  clientSecret: process.env.OA_FB_SECRET,
  callbackURL: getURL("facebook")
}, findUser));

passport.use(new GitHubStrategy({
  clientID: process.env.OA_GH_ID,
  clientSecret: process.env.OA_GH_SECRET,
  callbackURL: getURL("github")
}, findUser));

passport.use(new TwitterStrategy({
  consumerKey: process.env.OA_TT_ID,
  consumerSecret: process.env.OA_TT_SECRET,
  callbackURL: getURL("twitter")
}, findUser));

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
