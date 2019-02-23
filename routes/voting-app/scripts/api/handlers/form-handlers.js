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

const handleCreate = async (user, list, form) => {

  const id = uuid();

  await pollsCol().insertOne({
    title: form.title,
    author: user.name,
    id,
    date: Date.now(),
    private: form.private,
    users: {
      created: user.id,
      voted: 0,
      hidden: [],
      flagged: []
    },
    options: form.options.map((e) => ({
      text: e,
      created: user.id,
      voted: []
    }))
  });

  return {
    polls: await findPolls(user, list),
    poll: id
  };

};

const formCreatePoll = async (req, res) => {

  if (!req.user || req.user.data.restricted) {

    res.sendStatus(401);

    return;

  }

  const { list, form } = req.body;

  const doc = await pollsCol().findOne({ title: form.title });

  const errors = checkErrors([{
    bool: !form.title.trim(),
    text: "Title must not be empty"
  }, {
    bool: doc,
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
    res.json(await handleCreate(req.user, list, form));
  }

};

//exports

module.exports = { formCreatePoll };
