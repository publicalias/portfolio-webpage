"use strict";

//global imports

const { getIPUser } = require(`${__rootdir}/master/scripts/server-utils`);

//local imports

const { findByID, findPolls } = require("../../app-logic");

//meta get polls

const metaGetPolls = async (req, res) => {

  const { poll, skip, list } = JSON.parse(req.query.data);

  if ((!req.user || req.user.data.restricted) && list.filter === "created") {

    res.sendStatus(401);

    return;

  }

  const polls = poll ? [await findByID(poll)] : await findPolls(req, list, skip);

  res.json({ polls });

};

//menu get user

const metaGetUser = async (req, res) => {

  const user = req.user || await getIPUser(req.ip) || {};

  res.json({ user });

};

//exports

module.exports = {
  metaGetPolls,
  metaGetUser
};
