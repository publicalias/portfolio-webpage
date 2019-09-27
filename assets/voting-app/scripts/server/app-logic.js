"use strict";

//global imports

const { checkErrors, deepCopy } = require("all/utilities");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

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
  bool: options.length > 100,
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

//find item / find list

const addVotes = () => [{
  $addFields: {
    votes: {
      $reduce: {
        input: "$options",
        initialValue: 0,
        in: { $add: ["$$value", { $size: "$$this.voted" }] }
      }
    }
  }
}];

const findItem = async (id) => {

  const [item] = await pollsCol()
    .aggregate([{ $match: { id } }, ...addVotes()])
    .toArray();

  return item;

};

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

const findList = async (user, params, length = 0) => {

  const { search } = params;

  const { $match, $sort } = deepCopy({
    $match: getQuery(user, params),
    $sort: getSort(params)
  }, search ? {
    $match: { $text: { $search: search } },
    $sort: { score: { $meta: "textScore" } }
  } : null, {
    $sort: { _id: 1 } //ensures consistency in tests
  });

  await pollsCol().createIndex({
    "title": "text",
    "author": "text",
    "options.text": "text"
  });

  return pollsCol()
    .aggregate([{ $match }, ...addVotes(), { $sort }])
    .limit(length + 100) //refreshes the whole list
    .toArray();

};

//handle toggle

const handleToggle = async (id, user, prop) => {

  const { users } = await findItem(id);

  const bool = users[prop].includes(user.id);

  await pollsCol().updateOne({ id }, {
    [bool ? "$pull" : "$addToSet"]: {
      [`users.${prop}`]: user.id
    }
  });

};

//exports

module.exports = {
  checkOptions,
  checkTitle,
  findItem,
  findList,
  handleToggle
};
