"use strict";

//global imports

const { getIPUser } = require(`${__rootdir}/master/scripts/server-utils`);

//local imports

const { findPolls } = require("../../app-logic");

//meta get polls

const metaGetPolls = async (req, res) => {

  const { skip, list } = JSON.parse(req.query.data);

  const polls = await findPolls(req, list, skip);

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
