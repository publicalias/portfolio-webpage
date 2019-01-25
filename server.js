"use strict";

global.__rootdir = __dirname;

//global imports

const { toPromise } = require(`${__rootdir}/master/scripts/server-utils`);

//node modules

const compression = require("compression");
const express = require("express");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;

const app = express();

//middleware

app.use(compression());
app.use(express.static("build"));

toPromise(fs, "readdir", "./routes")
  .then((files) => {
    for (const e of files) {
      app.use(`/${e}`, require(`./routes/${e}/routes`));
    }
  })
  .catch(() => {
    process.exit(1);
  });

//home page

app.get("/", (req, res) => {
  res.redirect("/portfolio-webpage");
});

//projects

app.get("/:name", (req, res) => {
  res.sendFile(`${__dirname}/build/${req.params.name}/view.html`);
});

//initialize server

MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then((client) => {
    global.db = client.db();
    app.listen(process.env.PORT || 3000);
  })
  .catch(() => {
    process.exit(1);
  });
