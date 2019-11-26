"use strict";

//node modules

const compression = require("compression");
const express = require("express");
const fs = require("fs");

const { addPath } = require("app-module-path");
const { MongoClient } = require("mongodb");

const app = express();

//setup

global.__build = `${__dirname}/build`;
global.__ready = app;

addPath("master/scripts");

//middleware

app.use(compression());
app.use(express.static("build"));

//home page

app.get("/", (req, res) => {
  res.redirect("/portfolio-webpage");
});

//projects

const projects = fs.readdirSync("./assets");

for (const e of projects) {

  const routes = fs.existsSync(`./assets/${e}/routes.js`);

  if (routes) {
    app.use(`/${e}`, require(`./assets/${e}/routes`));
  } else {
    app.get(`/${e}`, (req, res) => {
      res.sendFile(`${__build}/${e}/view.html`);
    });
  }

}

//initialize server

MongoClient.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((res) => {
    global.db = res.db();
    app.listen(process.env.PORT || 3000, () => {
      app.emit("ready");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

process.on("unhandledRejection", (err) => {
  console.log(err);
});
