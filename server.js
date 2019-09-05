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

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

MongoClient.connect(process.env.DB_URL, config)
  .then((client) => {
    global.db = client.db();
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
