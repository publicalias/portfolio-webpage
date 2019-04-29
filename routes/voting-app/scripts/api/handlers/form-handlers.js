"use strict";

//global imports

const { newPoll } = require(`${__scripts}/schemas/voting-app`);
const { checkErrors } = require(`${__scripts}/utilities`);

//node modules

const uuid = require("uuid/v1");

const { regex: obscene } = require("badwords-list");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//form create poll

const handleCreate = async (req, res) => {

  const { form } = req.body.data;

  const id = uuid();

  await pollsCol().createIndex({ title: 1 }, { unique: true });

  await pollsCol().insertOne(newPoll({
    title: form.title,
    author: req.user.name,
    id,
    date: Date.now(),
    private: form.private,
    users: { created: req.user.id },
    options: form.options.map((e) => ({
      text: e,
      created: req.user.id
    }))
  }));

  res.json({ id });

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
