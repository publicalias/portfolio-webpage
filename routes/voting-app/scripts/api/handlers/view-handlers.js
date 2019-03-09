"use strict";

//local imports

const { findByID } = require("../../app-logic");

//global imports

const { getOrSetUser, retryWrite } = require(`${__rootdir}/master/scripts/server-utils`);
const { checkErrors } = require(`${__rootdir}/master/scripts/utilities`);

//node modules

const { regex: obscene } = require("badwords-list");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//view add option

const handleOption = async (req, res) => {

  const { poll, text } = req.body.data;

  const { matchedCount } = await pollsCol().updateOne({
    "id": poll,
    "options.text": { $ne: text }
  }, {
    $push: {
      options: {
        text,
        created: req.user.id,
        voted: []
      }
    }
  });

  if (matchedCount) {
    res.json({});
  } else {
    res.sendStatus(500);
  }

};

const viewAddOption = async (req, res) => {

  if (!req.user || req.user.data.restricted) {

    res.sendStatus(401);

    return;

  }

  const { poll, text } = req.body.data;

  const { options } = await findByID(poll);

  const errors = checkErrors([{
    bool: !text.trim(),
    text: "Option must not be empty"
  }, {
    bool: options.filter((e) => e.text === text).length,
    text: "Option must be unique"
  }, {
    bool: obscene.test(text),
    text: "Option must not be obscene"
  }]);

  if (errors.length) {
    res.json({ errors });
  } else {
    await handleOption(req, res);
  }

};

//view cast vote

const viewCastVote = async (req, res) => {

  const { poll, text } = req.body.data;

  const user = await getOrSetUser(req);

  await retryWrite(async () => {

    const { value: { options } } = await pollsCol().findOneAndUpdate({
      id: poll
    }, {
      $inc: { "users.voted": -1 },
      $pull: { "options.$[].voted": user.id }
    }, {
      returnOriginal: false
    });

    const { matchedCount } = await pollsCol().updateOne({
      id: poll,
      options
    }, {
      $inc: { "users.voted": 1 },
      $push: { "options.$[e].voted": user.id }
    }, {
      arrayFilters: [{ "e.text": text }]
    });

    return matchedCount;

  });

  res.json({});

};

//view delete poll

const viewDeletePoll = async (req, res) => {

  const { poll } = JSON.parse(req.query.data);

  const { users } = await findByID(poll);

  const created = (id) => id === users.created;

  if (!req.user || req.user.data.restricted || !created(req.user.id)) {

    res.sendStatus(401);

    return;

  }

  await pollsCol().deleteOne({ id: poll });

  res.json({});

};

//view remove option

const viewRemoveOption = async (req, res) => {

  const { poll, text } = req.body.data;

  const { users, options } = await findByID(poll);

  const index = options.findIndex((e) => e.text === text);

  const created = (id) => id === users.created || id === options[index].created;

  if (!req.user || req.user.data.restricted || !created(req.user.id)) {

    res.sendStatus(401);

    return;

  }

  await retryWrite(async () => {

    const { options } = await findByID(poll);

    const index = options.findIndex((e) => e.text === text);
    const votes = options[index].voted.length;

    const { matchedCount } = await pollsCol().updateOne({
      id: poll,
      options
    }, {
      $inc: { "users.voted": votes * -1 },
      $pull: { options: { text } }
    });

    return matchedCount;

  });

  res.json({});

};

//view toggle private

const viewTogglePrivate = async (req, res) => {

  const { poll } = req.body.data;

  const { users } = await findByID(poll);

  const created = (id) => id === users.created;

  if (!req.user || req.user.data.restricted || !created(req.user.id)) {

    res.sendStatus(401);

    return;

  }

  await retryWrite(async () => {

    const { private: bool } = await findByID(poll);

    const { matchedCount } = await pollsCol().updateOne({
      id: poll,
      private: bool
    }, {
      $set: { private: !bool }
    });

    return matchedCount;

  });

  res.json({});

};

//exports

module.exports = {
  viewAddOption,
  viewCastVote,
  viewDeletePoll,
  viewRemoveOption,
  viewTogglePrivate
};
