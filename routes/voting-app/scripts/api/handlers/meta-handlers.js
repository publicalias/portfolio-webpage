"use strict";

//local imports

const { findByID, findPolls } = require("../../app-logic");

//global imports

const { getIPUser } = require(`${__rootdir}/master/scripts/redux-utils/server-utils`);

//meta get polls

const metaGetPolls = async (req, res) => {

  const { id, skip, list } = JSON.parse(req.query.data);

  if ((!req.user || req.user.data.restricted) && list.filter === "created") {

    res.sendStatus(401);

    return;

  }

  const polls = id ? [await findByID(id)] : await findPolls(req, list, skip);

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
