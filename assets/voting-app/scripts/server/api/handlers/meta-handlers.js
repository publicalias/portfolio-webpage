"use strict";

//local imports

const { checkOptions, checkTitle, findByID, findPolls, handleCreate } = require("../../app-logic");

//global imports

const { getIPUser } = require("redux-utils/server-utils");
const { checkErrors } = require("utilities");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//meta create poll

const metaCreatePoll = async (req, res) => {

  if (!req.user || req.user.data.restricted) {

    res.sendStatus(401);

    return;

  }

  const { title, options } = req.body.data;

  const exists = await pollsCol().findOne({ title });
  const errors = checkOptions(options).concat(checkTitle(title, exists));

  if (errors.length) {
    res.json({ errors });
  } else {
    await handleCreate(req, res);
  }

};

//meta delete poll

const metaDeletePoll = async (req, res) => {

  const { id } = JSON.parse(req.query.data);

  const { users } = await findByID(id);

  const created = (id) => id === users.created;

  if (!req.user || req.user.data.restricted || !created(req.user.id)) {

    res.sendStatus(401);

    return;

  }

  await pollsCol().deleteOne({ id });

  res.json({});

};

//meta get polls

const metaGetPolls = async (req, res) => {

  const { params, id, length } = JSON.parse(req.query.data);

  if (id) {

    res.json({ polls: [await findByID(id)].filter((e) => e) });

    return;

  }

  const errors = checkErrors([{
    bool: params.search.length > 100,
    text: "Search exceeds character limit"
  }]);

  if ((!req.user || req.user.data.restricted) && params.filter === "created") {
    res.sendStatus(401);
  } else if (errors.length) {
    res.json({ errors });
  } else {
    res.json({ polls: await findPolls(req, params, length) });
  }

};

//menu get user

const metaGetUser = async (req, res) => {

  const user = req.user || await getIPUser(req.ip) || {};

  res.json({ user });

};

//exports

module.exports = {
  metaCreatePoll,
  metaDeletePoll,
  metaGetPolls,
  metaGetUser
};
