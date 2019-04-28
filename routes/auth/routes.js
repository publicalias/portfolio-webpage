"use strict";

//local imports

const { handleDelete } = require("./scripts/app-logic");
const { passport, providers } = require("./scripts/passport/passport-config");

//global imports

const { handleSession } = require(`${__rootdir}/master/scripts/redux-utils/server-utils`);

//node modules

const express = require("express");

const router = express.Router();

//middleware

handleSession(router);

router.use("/delete", (req, res, next) => {
  if (req.user && !req.user.data.restricted) {
    next();
  } else {
    res.sendStatus(401);
  }
});

//handle login

for (const e of providers) {
  router.get(`/${e}`, passport.authenticate(e));
  router.get(`/${e}/callback`, passport.authenticate(e, {
    successRedirect: "/auth/redirect",
    failureRedirect: "/auth/redirect"
  }));
}

//handle logout

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/redirect");
});

//redirect

router.get("/redirect", (req, res) => {
  res.redirect(req.session.redirect);
});

//delete user

router.delete("/delete", handleDelete);

//exports

module.exports = router;
