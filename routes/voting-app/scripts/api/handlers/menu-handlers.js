"use strict";

//local imports

const { findPolls } = require("../../app-logic");

//menu set filter

const menuSetFilter = async (req, res) => {

  const { list } = JSON.parse(req.query.data);

  if ((!req.user || req.user.data.restricted) && list.filter === "created") {

    res.sendStatus(401);

    return;

  }

  const polls = await findPolls(req, list);

  res.json({ polls });

};

//exports

module.exports = { menuSetFilter };
