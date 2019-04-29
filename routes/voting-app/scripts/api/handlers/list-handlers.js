"use strict";

//local imports

const { findByID } = require("../../app-logic");

//global imports

const { getOrSetUser, retryWrite } = require(`${__scripts}/redux-utils/server-utils`);

//utilities

const pollsCol = () => db.collection("voting-app/polls");

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

//list toggle flag

const listToggleFlag = async (req, res) => {

  if (!req.user || req.user.data.restricted) {

    res.sendStatus(401);

    return;

  }

  const { id } = req.body.data;

  await handleToggle(id, req.user, "flagged");

  res.json({});

};

//list toggle hide

const listToggleHide = async (req, res) => {

  const { id } = req.body.data;

  await handleToggle(id, await getOrSetUser(req), "hidden");

  res.json({});

};

//exports

module.exports = {
  listToggleFlag,
  listToggleHide
};
