"use strict";

//local imports

const { checkOptions, findByID, handleOption, handleToggle } = require("../../app-logic");

//global imports

const { getIPUser, getOrSetUser } = require("redux-utils/server-utils");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//poll add option

const pollAddOption = async (req, res) => {

  if (!req.user || req.user.data.restricted) {

    res.sendStatus(401);

    return;

  }

  const { id, text } = req.body.data;

  const { options } = await findByID(id);

  const errors = checkOptions([text, ...options.map((e) => e.text)]);

  if (errors.length) {
    res.json({ errors });
  } else {
    await handleOption(req, res);
  }

};

//poll cast vote

const pollCastVote = async (req, res) => {

  const { id, text } = req.body.data;

  const user = await getOrSetUser(req);

  await pollsCol().updateOne({ id }, { $pull: { "options.$[].voted": user.id } });

  await pollsCol().updateOne({
    id
  }, {
    $addToSet: { "options.$[e].voted": user.id }
  }, {
    arrayFilters: [{ "e.text": text }]
  });

  res.json({});

};

//poll remove option

const pollRemoveOption = async (req, res) => {

  const { id, text } = req.body.data;

  const { users, options } = await findByID(id);

  const index = options.findIndex((e) => e.text === text);

  const created = (id) => id === users.created || id === options[index].created;

  if (!req.user || req.user.data.restricted || !created(req.user.id)) {

    res.sendStatus(401);

    return;

  }

  await pollsCol().updateOne({ id }, { $pull: { options: { text } } });

  res.json({});

};

//poll remove vote

const pollRemoveVote = async (req, res) => {

  const { id } = req.body.data;

  const user = req.user || await getIPUser(req.ip) || {};

  await pollsCol().updateOne({ id }, { $pull: { "options.$[].voted": user.id } });

  res.json({});

};

//poll toggle flag

const pollToggleFlag = async (req, res) => {

  if (!req.user || req.user.data.restricted) {

    res.sendStatus(401);

    return;

  }

  const { id } = req.body.data;

  await handleToggle(id, req.user, "flagged");

  res.json({});

};

//poll toggle hide

const pollToggleHide = async (req, res) => {

  const { id } = req.body.data;

  await handleToggle(id, await getOrSetUser(req), "hidden");

  res.json({});

};

//poll toggle secret

const pollToggleSecret = async (req, res) => {

  const { id } = req.body.data;

  const { users } = await findByID(id);

  const created = (id) => id === users.created;

  if (!req.user || req.user.data.restricted || !created(req.user.id)) {

    res.sendStatus(401);

    return;

  }

  const { secret } = await findByID(id);

  await pollsCol().updateOne({ id }, { $set: { secret: !secret } });

  res.json({});

};

//exports

module.exports = {
  pollAddOption,
  pollCastVote,
  pollRemoveOption,
  pollRemoveVote,
  pollToggleFlag,
  pollToggleHide,
  pollToggleSecret
};
