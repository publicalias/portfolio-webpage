"use strict";

//local imports

const { findByID } = require("../../app-logic");

//global imports

const { getOrSetUser, retryWrite } = require(`${__rootdir}/master/scripts/server-utils`);

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

//list toggle flag

const listToggleFlag = async (req, res) => {

  if (!req.user || req.user.data.restricted) {

    res.sendStatus(401);

    return;

  }

  const { poll } = req.body.data;

  await handleToggle(poll, req.user, "flagged");

  res.json({});

};

//list toggle hide

const listToggleHide = async (req, res) => {

  const { poll } = req.body.data;

  const user = await getOrSetUser(req);

  await handleToggle(poll, user, "hidden");

  res.json({});

};

//exports

module.exports = {
  listToggleFlag,
  listToggleHide
};
