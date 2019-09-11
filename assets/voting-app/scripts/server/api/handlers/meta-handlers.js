"use strict";

//local imports

const { checkOptions, checkTitle, findByID, findPolls } = require("../../app-logic");
const { newPoll } = require("../../../../schemas");

//global imports

const { checkErrors } = require("all/utilities");
const { getIPUser, handleAPICall, handleAuthFail, handleErrors } = require("redux/server-utils");

//node modules

const uuid = require("uuid/v1");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//meta create poll

const metaCreatePoll = handleAPICall({

  failure: handleAuthFail,

  async errors(req, res) {

    const { title, options } = req.body.data;

    const exists = await pollsCol().findOne({ title });
    const errors = checkOptions(options).concat(checkTitle(title, exists));

    handleErrors(res, errors);

  },

  async success(req, res) {

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

  }

});

//meta delete poll

const metaDeletePoll = handleAPICall({

  async failure(req, res) {

    const { id } = JSON.parse(req.query.data);

    const { users } = await findByID(id);

    handleAuthFail(req, res, (id) => id !== users.created);

  },

  async success(req, res) {

    const { id } = JSON.parse(req.query.data);

    await pollsCol().deleteOne({ id });

    res.json({});

  }

});

//meta get poll item

const metaGetPollItem = async (req, res) => {

  const { id } = JSON.parse(req.query.data);

  res.json({ polls: [await findByID(id)].filter((e) => e) });

};

//meta get poll list

const metaGetPollList = handleAPICall({

  failure(req, res) {

    const { params } = JSON.parse(req.query.data);

    if (params.filter === "created") {
      handleAuthFail(req, res);
    }

  },

  errors(req, res) {

    const { params } = JSON.parse(req.query.data);

    handleErrors(res, checkErrors([{
      bool: params.search.length > 100,
      text: "Search exceeds character limit"
    }]));

  },

  async success(req, res) {

    const { params, length } = JSON.parse(req.query.data);

    const user = req.user || await getIPUser(req.ip) || {};

    res.json({ polls: await findPolls(user, params, length) });

  }

});

//menu get user

const metaGetUser = async (req, res) => {

  const user = req.user || await getIPUser(req.ip) || {};

  res.json({ user });

};

//exports

module.exports = {
  metaCreatePoll,
  metaDeletePoll,
  metaGetPollItem,
  metaGetPollList,
  metaGetUser
};
