"use strict";

//local imports

const { findByID, findPolls, handleCreate } = require("../../app-logic");

//global imports

const { getIPUser } = require(`${__scripts}/redux-utils/server-utils`);
const { checkErrors } = require(`${__scripts}/utilities`);

//node modules

const { regex: obscene } = require("badwords-list");

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

  const errors = checkErrors([{
    bool: !title.trim(),
    text: "Title must not be empty"
  }, {
    bool: title.length > 100,
    text: "Title must not exceed character limit"
  }, {
    bool: exists,
    text: "Title must be unique"
  }, {
    bool: obscene.test(title),
    text: "Title must not be obscene"
  }, {
    bool: options.filter((e) => !e.trim()).length,
    text: "Option must not be empty"
  }, {
    bool: options.filter((e) => e.length > 100).length,
    text: "Option must not exceed character limit"
  }, {
    bool: options.filter((e, i, arr) => arr.lastIndexOf(e) !== i).length,
    text: "Option must be unique"
  }, {
    bool: options.filter((e) => obscene.test(e)).length,
    text: "Option must not be obscene"
  }]);

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
    text: "Search must not exceed character limit"
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
