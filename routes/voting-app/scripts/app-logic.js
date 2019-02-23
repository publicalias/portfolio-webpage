"use strict";

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//filter polls

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

const findPolls = (user, list, skip) => {

  const query = getQuery(user, list);
  const projection = { _id: false };
  const sort = getSort(list);

  const text = { $text: { $search: list.searched } }; //expects text index
  const meta = { score: { $meta: "textScore" } };

  if (list.searched) {
    Object.assign(query, text);
    Object.assign(projection, meta);
    Object.assign(sort, meta);
  }

  return pollsCol()
    .find(query, { projection })
    .sort(sort)
    .skip(skip ? list.index + 1 : 0)
    .limit((skip ? 0 : list.index) + 50)
    .toArray();

};

//exports

module.exports = { findPolls };
