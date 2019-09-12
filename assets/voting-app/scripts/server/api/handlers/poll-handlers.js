"use strict";

//local imports

const { checkOptions, findByID, handleToggle } = require("../../app-logic");
const { newOption } = require("../../../../schemas");

//global imports

const { getIPUser, getOrSetUser, handleAPICall, handleAuthFail, handleErrors } = require("redux/server-utils");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//poll add option

const pollAddOption = handleAPICall({

  failure: handleAuthFail,

  async errors(req, res) {

    const { id, text } = req.body.data;

    const { options } = await findByID(id);

    handleErrors(res, checkOptions([text, ...options.map((e) => e.text)]));

  },

  async success(req, res) {

    const { id, text } = req.body.data;

    await pollsCol().updateOne({
      id,
      "options.text": { $ne: text } //possible race condition is tolerable
    }, {
      $push: {
        options: newOption({
          text,
          created: req.user.id
        })
      }
    });

    res.json({});

  }

});

//poll cast vote

const pollCastVote = async (req, res) => {

  const { id, text } = req.body.data;

  const user = await getOrSetUser(req.user, req.ip);

  await pollsCol().updateOne({ id }, { $pull: { "options.$[].voted": user.id } });
  await pollsCol().updateOne({
    id,
    "options.voted": { $ne: user.id }
  }, {
    $addToSet: { "options.$[e].voted": user.id }
  }, {
    arrayFilters: [{ "e.text": text }]
  });

  res.json({});

};

//poll remove option

const pollRemoveOption = handleAPICall({

  async failure(req, res) {

    const { id, text } = req.body.data;

    const { users, options } = await findByID(id);

    handleAuthFail(req, res, (id) => {

      const index = options.findIndex((e) => e.text === text);

      return id !== users.created && id !== options[index].created;

    });

  },

  async success(req, res) {

    const { id, text } = req.body.data;

    await pollsCol().updateOne({ id }, { $pull: { options: { text } } });

    res.json({});

  }

});

//poll remove vote

const pollRemoveVote = handleAPICall({

  async failure(req, res) {

    const user = req.user || await getIPUser(req.ip);

    if (!user) {
      res.sendStatus(401);
    }

    return user;

  },

  async success(req, res, user) {

    const { id } = req.body.data;

    await pollsCol().updateOne({ id }, { $pull: { "options.$[].voted": user.id } });

    res.json({});

  }

});

//poll toggle flag

const pollToggleFlag = handleAPICall({

  failure: handleAuthFail,

  async success(req, res) {

    const { id } = req.body.data;

    await handleToggle(id, req.user, "flagged");

    res.json({});

  }

});

//poll toggle hide

const pollToggleHide = async (req, res) => {

  const { id } = req.body.data;

  await handleToggle(id, await getOrSetUser(req.user, req.ip), "hidden");

  res.json({});

};

//poll toggle secret

const pollToggleSecret = handleAPICall({

  async failure(req, res) {

    const { id } = req.body.data;

    const { secret, users } = await findByID(id);

    handleAuthFail(req, res, (id) => id !== users.created);

    return secret;

  },

  async success(req, res, secret) {

    const { id } = req.body.data;

    await pollsCol().updateOne({ id }, { $set: { secret: !secret } });

    res.json({});

  }

});

//exports

module.exports = {
  pollAddOption,
  pollCastVote,
  pollRemoveOption,
  pollRemoveVote,
  pollToggleFlag,
  pollToggleHide,
  pollToggleSecret
};
