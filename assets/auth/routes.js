"use strict";

//local imports

const { handleDelete } = require("./scripts/app-logic");
const { passport, providers } = require("./scripts/passport/passport-config");

//global imports

const { handleSession } = require("redux-utils/server-utils");

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

  router.get(`/${e}`, (req, res) => {
    req.session.redirect = req.query.redirect;
    passport.authenticate(e)(req, res);
  });

  router.get(`/${e}/callback`, passport.authenticate(e, {
    successRedirect: "/auth/redirect",
    failureRedirect: "/auth/redirect?status=401"
  }));

  router.use(`/${e}/callback`, (err, req, res, next) => {
    if (err) {
      res.redirect("/auth/redirect?status=500");
    } else {
      next();
    }
  });

}

//handle logout

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/redirect");
});

//redirect

router.get("/redirect", (req, res) => {

  const status = {
    401: "401 Unauthorized",
    500: "500 Internal Server Error"
  };

  const search = req.query.status ? `?errors=${JSON.stringify([status[req.query.status]])}` : "";

  res.redirect(`${req.session.redirect}${search}`);

});

//delete user

router.delete("/delete", handleDelete);

//exports

module.exports = router;
