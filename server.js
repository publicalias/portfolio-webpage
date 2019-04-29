"use strict";

//local imports

const globals = require("./globals");

Object.assign(global, globals);

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
    res.sendFile(`./build/${req.params.name}/view.html`);
  }
};

//home page

app.get("/", (req, res) => {
  res.redirect("/portfolio-webpage");
});

//projects

const files = fs.readdirSync("./routes");

for (const e of files) {
  app.use(`/${e}`, require(`./routes/${e}/routes`));
}

app.get("/:name", serverless(files));

//initialize server

MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then((client) => {
    global.db = client.db();
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
