"use strict";

//local imports

const { newOption, newPoll } = require("../../schemas");

//global imports

const { getIPUser, retryWrite } = require("redux-utils/server-utils");
const { checkErrors, deepCopy } = require("utilities");

//node modules

const uuid = require("uuid/v1");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

const addVotes = {
  $addFields: {
    votes: {
      $reduce: {
        input: "$options",
        initialValue: 0,
        in: { $add: ["$$value", { $size: "$$this.voted" }] }
      }
    }
  }
};

//check options

const checkOptions = (options) => checkErrors([{
  bool: options.filter((e) => !e.trim()).length,
  text: "Option is empty"
}, {
  bool: options.filter((e) => e.length > 100).length,
  text: "Option exceeds character limit"
}, {
  bool: options.filter((e, i, arr) => arr.lastIndexOf(e) !== i).length,
  text: "Option already exists"
}, {
  bool: options.length > 20,
  text: "Option exceeds limit"
}]);

//check title

const checkTitle = (title, exists) => checkErrors([{
  bool: !title.trim(),
  text: "Title is empty"
}, {
  bool: title.length > 100,
  text: "Title exceeds character limit"
}, {
  bool: exists,
  text: "Title already exists"
}]);

//find by id

const findByID = async (id) => {

  const res = await pollsCol()
    .aggregate([{ $match: { id } }, addVotes])
    .toArray();

  return res[0];

};

//find polls

const getQuery = (user, { filter }) => {

  const types = {
    all: { $nor: [{ secret: true }, { "users.hidden": user.id }, { $expr: { $gte: [{ $size: "$users.flagged" }, 5] } }] },
    created: { $or: [{ "users.created": user.id }, { "options.created": user.id }] },
    voted: { "options.voted": user.id },
    hidden: { "users.hidden": user.id }
  };

  return types[filter];

};

const getSort = ({ sort }) => {

  const types = {
    new: { date: -1 },
    popular: { votes: -1 }
  };

  return types[sort];

};

const findPolls = async (req, params, length = 0) => {

  const { search } = params;

  const user = req.user || await getIPUser(req.ip) || {};

  const args = deepCopy({
    query: getQuery(user, params),
    sort: getSort(params)
  }, search ? {
    query: { $text: { $search: search } },
    sort: { score: { $meta: "textScore" } }
  } : null, {
    sort: { _id: 1 } //ensures consistency in tests
  });

  await pollsCol().createIndex({
    "title": "text",
    "author": "text",
    "options.text": "text"
  });

  return pollsCol()
    .aggregate([{ $match: args.query }, addVotes, { $sort: args.sort }])
    .limit(length + 100) //refreshes the whole list
    .toArray();

};

//handle create

const handleCreate = async (req, res) => {

  const { title, options, secret } = req.body.data;

  await pollsCol().createIndex({ title: 1 }, { unique: true });

  await pollsCol().insertOne(newPoll({
    title: title.trim(),
    author: req.user.name,
    id: uuid(),
    date: Date.now(),
    secret,
    users: { created: req.user.id },
    options: options.map((e) => ({
      text: e.trim(),
      created: req.user.id
    }))
  }));

  res.json({});

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
  checkOptions,
  checkTitle,
  findByID,
  findPolls,
  handleCreate,
  handleOption,
  handleToggle
};
