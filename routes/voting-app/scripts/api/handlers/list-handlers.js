"use strict";

//local imports

const { findByID, findPolls } = require("../../app-logic");

//global imports

const { getOrSetUser, retryWrite } = require(`${__rootdir}/master/scripts/server-utils`);
const { checkErrors } = require(`${__rootdir}/master/scripts/utilities`);

//utilities

const pollsCol = () => db.collection("voting-app/polls");

const handleToggle = (poll, user, prop) => retryWrite(async () => {

  const { users } = await findByID(poll);

  const bool = users[prop].includes(user.id);

  const { matchedCount } = await pollsCol().updateOne({
    id: poll,
    [`users.${prop}`]: users[prop]
  }, {
    [bool ? "$pull" : "$push"]: {
      [`users.${prop}`]: user.id
    }
  });

  return matchedCount;

});

//list set sort

const listSetSort = async (req, res) => {

  const { list } = JSON.parse(req.query.data);

  const polls = await findPolls(req, list);

  res.json({ polls });

};

//list submit search

const listSubmitSearch = async (req, res) => {

  const { list } = JSON.parse(req.query.data);

  const errors = checkErrors([{
    bool: !list.searched,
    text: "Search must not be empty"
  }]);

  if (errors.length) {

    res.json({ errors });

    return;

  }

  const polls = await findPolls(req, list);

  res.json({ polls });

};

//list toggle flag

const listToggleFlag = async (req, res) => {

  if (!req.user || req.user.data.restricted) {

    res.sendStatus(401);

    return;

  }

  const { poll, list } = req.body.data;

  await handleToggle(poll, req.user, "flagged");

  const polls = await findPolls(req, list);

  res.json({ polls });

};

//list toggle hide

const listToggleHide = async (req, res) => {

  const { poll, list } = req.body.data;

  const { user, created } = await getOrSetUser(req);

  await handleToggle(poll, user, "hidden");

  const polls = await findPolls(req, list);

  res.json(Object.assign({ polls }, created ? { user } : {}));

};

//exports

module.exports = {
  listSetSort,
  listSubmitSearch,
  listToggleFlag,
  listToggleHide
};
