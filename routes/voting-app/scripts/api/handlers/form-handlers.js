"use strict";

//local imports

const { findPolls } = require("../../app-logic");

//global imports

const { checkErrors } = require(`${__rootdir}/master/scripts/utilities`);

//node modules

const { regex: obscene } = require("badwords-list");

const uuid = require("uuid/v1");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//form create poll

const handleCreate = async (req, res) => {

  const { list, form } = req.body.data;

  const id = uuid();

  await pollsCol().createIndex({ title: 1 }, { unique: true });

  await pollsCol().insertOne({
    title: form.title,
    author: req.user.name,
    id,
    date: Date.now(),
    private: form.private,
    users: {
      created: req.user.id,
      voted: 0,
      hidden: [],
      flagged: []
    },
    options: form.options.map((e) => ({
      text: e,
      created: req.user.id,
      voted: []
    }))
  });

  const polls = await findPolls(req, list);

  res.json({
    polls,
    poll: id
  });

};

const formCreatePoll = async (req, res) => {

  if (!req.user || req.user.data.restricted) {

    res.sendStatus(401);

    return;

  }

  const { form } = req.body.data;

  const exists = await pollsCol().findOne({ title: form.title });

  const errors = checkErrors([{
    bool: !form.title.trim(),
    text: "Title must not be empty"
  }, {
    bool: exists,
    text: "Title must be unique"
  }, {
    bool: obscene.test(form.title),
    text: "Title must not be obscene"
  }, {
    bool: form.options.filter((e) => e.trim() === "").length,
    text: "Option must not be empty"
  }, {
    bool: form.options.filter((e, i, arr) => arr.lastIndexOf(e) !== i).length,
    text: "Option must be unique"
  }, {
    bool: form.options.filter((e) => obscene.test(e)).length,
    text: "Option must not be obscene"
  }]);

  if (errors.length) {
    res.json({ errors });
  } else {
    await handleCreate(req, res);
  }

};

//exports

module.exports = { formCreatePoll };
