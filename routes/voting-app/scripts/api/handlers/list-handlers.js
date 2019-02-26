"use strict";

//local imports

const { findPolls } = require("../../app-logic");

//global imports

const { getIPUser, setIPUser } = require(`${__rootdir}/master/scripts/server-utils`);
const { checkErrors } = require(`${__rootdir}/master/scripts/utilities`);

//utilities

const pollsCol = () => db.collection("voting-app/polls");

const handleToggle = async (poll, user, prop) => {

  const bool = Boolean(await pollsCol().findOne({
    id: poll,
    [`users.${prop}`]: user.id
  }));

  await pollsCol().updateOne({ id: poll }, {
    [bool ? "$pull" : "$push"]: {
      [`users.${prop}`]: user.id
    }
  });

};

//list set sort

const listSetSort = async (req, res) => {

  const { list } = JSON.parse(req.query.data);

  res.json({ polls: await findPolls(req, list) });

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
  } else {
    res.json({ polls: await findPolls(req, list) });
  }

};

//list toggle flag

const listToggleFlag = async (req, res) => {

  if (!req.user || req.user.data.restricted) {

    res.sendStatus(401);

    return;

  }

  const { poll, list } = req.body.data;

  await handleToggle(poll, req.user, "flagged");

  res.json({ polls: await findPolls(req, list) });

};

//list toggle hide

const listToggleHide = async (req, res) => {

  const { poll, list } = req.body.data;

  let user = req.user || await getIPUser(req.ip);
  let merge;

  if (!user) {
    user = await setIPUser(req.ip);
    merge = true;
  }

  await handleToggle(poll, user, "hidden");

  const polls = await findPolls(req, list);

  res.json(Object.assign({ polls }, merge ? { user } : {}));

};

//exports

module.exports = {
  listSetSort,
  listSubmitSearch,
  listToggleFlag,
  listToggleHide
};
