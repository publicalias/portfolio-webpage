"use strict";

//local imports

const { deleteUserData } = require("./scripts/app-logic");
const { passport, providers } = require("./scripts/passport/passport-config");

//global imports

const { handleAuthFail, handleSession } = require("redux/server-utils");

//node modules

const express = require("express");

const router = express.Router();

//utilities

const usersCol = () => db.collection("auth/users");

//middleware

handleSession(router);

router.use("/delete", (req, res, next) => {

  handleAuthFail(req, res);

  if (!res.headersSent) {
    next();
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

  req.session.redirect = req.query.redirect;

  req.logout();
  res.redirect("/auth/redirect");

});

//redirect

router.get("/redirect", (req, res) => {

  const { query: { status } } = req;

  const errors = ((errors) => JSON.stringify([errors[status]]))({
    401: "401 Unauthorized",
    500: "500 Internal Server Error"
  });

  const search = status ? `?errors=${errors}` : "";

  res.redirect(`${req.session.redirect}${search}`);

});

//delete user

router.delete("/delete", async (req, res) => {
  try {

    await deleteUserData(req.user.id);

    await usersCol().deleteOne({ id: req.user.id });

    req.logout();
    res.sendStatus(200);

  } catch {
    res.sendStatus(500);
  }
});

//exports

module.exports = router;
