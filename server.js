"use strict";

global.__rootdir = __dirname;

//global imports

const { toPromise } = require(`${__rootdir}/master/scripts/server-utils`);

//node modules

const compression = require("compression");
const express = require("express");
const fs = require("fs");

const { MongoClient } = require("mongodb");

const app = express();

//middleware

app.use(compression());
app.use(express.static("build"));

//utilities

const serverless = (files) => (req, res) => {
  if (!files.includes(req.params.name)) {
    res.sendFile(`${__dirname}/build/${req.params.name}/view.html`);
  }
};

//home page

app.get("/", (req, res) => {
  res.redirect("/portfolio-webpage");
});

//projects

toPromise(fs, "readdir", "./routes")
  .then((files) => {

    for (const e of files) {
      app.use(`/${e}`, require(`./routes/${e}/routes`));
    }

    app.get("/:name", serverless(files));

  })
  .catch(() => {
    process.exit(1);
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
