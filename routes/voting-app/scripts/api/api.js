"use strict";

//local imports

const formHandlers = require("./handlers/form-handlers");
const listHandlers = require("./handlers/list-handlers");
const metaHandlers = require("./handlers/meta-handlers");
const viewHandlers = require("./handlers/view-handlers");

//node modules

const express = require("express");

const router = express.Router();

//utilities

const apiRequest = async (req, res) => {

  const handlers = Object.assign(
    formHandlers,
    listHandlers,
    metaHandlers,
    viewHandlers
  );

  const handler = req.params.action.split("-")
    .map((e, i) => i === 0 ? e : `${e[0].toUpperCase()}${e.slice(1)}`)
    .join("");

  try {
    await handlers[handler](req, res);
  } catch (err) {
    res.sendStatus(500);
  }

};

//handle actions

router.post("/:action", apiRequest);
router.get("/:action", apiRequest);
router.patch("/:action", apiRequest);
router.delete("/:action", apiRequest);

//exports

module.exports = router;
