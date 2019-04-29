"use strict";

//global imports

const { getIPUser } = require(`${__scripts}/redux-utils/server-utils`);
const { deepCopy } = require(`${__scripts}/utilities`);

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//find by id

const findByID = (id) => pollsCol().findOne({ id });

//find polls

const getQuery = (user, list) => {

  const types = {
    all: { $nor: [{ private: true }, { "users.hidden": user.id }] },
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

//exports

module.exports = {
  findByID,
  findPolls
};
