"use strict";

//local imports

const { friendIDList, isValidTime } = require("../../app-logic");
const { newRSVP } = require("../../../../schemas");

//global imports

const { checkErrors } = require("all/utilities");
const { handleAPICall, handleAuthFail, handleErrors } = require("redux/server-utils");

//node modules

const uuid = require("uuid/v1");

//utilities

const rsvpCol = () => db.collection("nightlife-app/rsvps");

//rsvp add

const rsvpAdd = handleAPICall({

  failure: handleAuthFail,

  errors(req, res) {

    const { time } = req.body.data;

    handleErrors(res, checkErrors([{
      bool: !isValidTime(time),
      text: "Time is incorrectly formatted"
    }]));

  },

  async success(req, res) {

    const { name, id, time, message } = req.body.data;

    await rsvpCol().createIndex({
      "user.id": 1,
      "venue.id": 1
    }, {
      unique: true
    });

    await rsvpCol().insertOne(newRSVP({
      id: uuid(),
      date: Date.now(),
      user: {
        name: req.user.name,
        id: req.user.id
      },
      venue: {
        name,
        id
      },
      time,
      message
    }));

    res.json({});

  }

});

//rsvp dismiss

const rsvpDismiss = handleAPICall({

  async failure(req, res) {

    const { id } = req.body.data;

    const { user } = await rsvpCol().findOne({ id });

    const friends = await friendIDList(user.id);

    handleAuthFail(req, res, (id) => !friends.includes(id));

  },

  async success(req, res) {

    const { id } = req.body.data;

    await rsvpCol().updateOne({ id }, { $addToSet: { hidden: req.user.id } });

    res.json({});

  }

});

//rsvp get list

const rsvpGetList = handleAPICall({

  failure: handleAuthFail,

  async success(req, res) {

    const friends = await friendIDList(req.user.id);

    const rsvps = await rsvpCol()
      .find({
        "user.id": { $in: friends },
        "hidden": { $ne: req.user.id }
      })
      .sort({ date: -1 })
      .toArray();

    res.json({ notifications: { rsvps } });

  }

});

//rsvp remove

const rsvpRemove = handleAPICall({

  async failure(req, res) {

    const { id } = JSON.parse(req.query.data);

    const { user } = await rsvpCol().findOne({ id });

    handleAuthFail(req, res, (id) => id !== user.id);

  },

  async success(req, res) {

    const { id } = JSON.parse(req.query.data);

    await rsvpCol().deleteOne({ id });

    res.json({});

  }

});

//exports

module.exports = {
  rsvpAdd,
  rsvpDismiss,
  rsvpGetList,
  rsvpRemove
};
