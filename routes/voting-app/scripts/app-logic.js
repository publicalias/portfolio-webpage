"use strict";

//global imports

const { getIPUser, retryWrite } = require(`${__scripts}/redux-utils/server-utils`);
const { newOption, newPoll } = require(`${__scripts}/schemas/voting-app`);
const { deepCopy } = require(`${__scripts}/utilities`);

//node modules

const uuid = require("uuid/v1");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//find by id

const findByID = (id) => pollsCol().findOne({ id });

//find polls

const getQuery = (user, list) => {

  const types = {
    all: { $nor: [{ secret: true }, { "users.hidden": user.id }] },
    created: { $or: [{ "users.created": user.id }, { "options.created": user.id }] },
    voted: { "options.voted": user.id },
    hidden: { "users.hidden": user.id }
  };

  return types[list.filter];

};

const getSort = (list) => {

  const types = {
    new: { date: -1 },
    popular: { "users.voted": -1 }
  };

  return types[list.sort];

};

const findPolls = async (req, list, skip) => {

  const user = req.user || await getIPUser(req.ip) || {};

  const text = { $text: { $search: list.searched } };
  const meta = { score: { $meta: "textScore" } };

  let args = {
    query: getQuery(user, list),
    projection: {},
    sort: getSort(list)
  };

  if (list.searched) {
    args = deepCopy(args, {
      query: text,
      projection: meta,
      sort: meta
    });
  }

  await pollsCol().createIndex({
    "title": "text",
    "author": "text",
    "options.text": "text"
  });

  return pollsCol()
    .find(args.query, { projection: args.projection })
    .sort(args.sort)
    .skip(skip ? list.index + 1 : 0)
    .limit((skip ? 0 : list.index) + 50)
    .toArray();

};

//handle create

const handleCreate = async (req, res) => {

  const { title, options, secret } = req.body.data;

  const id = uuid();

  await pollsCol().createIndex({ title: 1 }, { unique: true });

  await pollsCol().insertOne(newPoll({
    title: title.trim(),
    author: req.user.name,
    id,
    date: Date.now(),
    secret,
    users: { created: req.user.id },
    options: options.map((e) => ({
      text: e.trim(),
      created: req.user.id
    }))
  }));

  res.json({ id });

};

//handle option

const handleOption = async (req, res) => {

  const { id, text } = req.body.data;

  const { matchedCount } = await pollsCol().updateOne({
    id,
    "options.text": { $ne: text }
  }, {
    $push: {
      options: newOption({
        text,
        created: req.user.id
      })
    }
  });

  if (matchedCount) {
    res.json({});
  } else {
    res.sendStatus(500);
  }

};

//handle toggle

const handleToggle = (id, user, prop) => retryWrite(async () => {

  const { users } = await findByID(id);

  const bool = users[prop].includes(user.id);

  const { matchedCount } = await pollsCol().updateOne({
    id,
    [`users.${prop}`]: users[prop]
  }, {
    [bool ? "$pull" : "$push"]: {
      [`users.${prop}`]: user.id
    }
  });

  return matchedCount;

});

//exports

module.exports = {
  findByID,
  findPolls,
  handleCreate,
  handleOption,
  handleToggle
};
