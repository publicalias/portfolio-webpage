"use strict";

global.__rootdir = __dirname;

//node modules

const compression = require("compression");
const express = require("express");
const fs = require("fs");

const app = express();

//middleware

app.use(compression());
app.use(express.static("build"));

fs.readdir("./routes", (err, files) => {

  if (err) {
    throw err;
  }

  for (const e of files) {
    app.use(`/${e}`, require(`./routes/${e}/routes`));
  }

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

app.listen(process.env.PORT || 3000);
