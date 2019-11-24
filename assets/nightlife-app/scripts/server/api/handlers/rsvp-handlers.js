"use strict";

//local imports

const { friendIDList, readTime } = require("../../app-logic");
const { newRSVP } = require("../../../../schemas");

//global imports

const { checkErrors } = require("all/utilities");
const { handleAPICall, handleAuthFail, handleErrors } = require("redux/server-utils");

//node modules

const uuid = require("uuid/v1");

//utilities

const rsvpsCol = () => db.collection("nightlife-app/rsvps");

//rsvp add

const rsvpAdd = handleAPICall({

  failure: handleAuthFail,

  async errors(req, res) {

    const { id, time, message } = req.body.data;

    const exists = await rsvpsCol().findOne({
      "user.id": req.user.id,
      "venue.id": id,
      "time": readTime(time)
    });

    handleErrors(res, checkErrors([{
      bool: !id,
      text: "Venue does not exist"
    }, {
      bool: exists,
      text: "RSVP already exists"
    }, {
      bool: time.length > 100,
      text: "Time exceeds character limit"
    }, {
      bool: message.length > 100,
      text: "Message exceeds character limit"
    }, {
      bool: !readTime(time),
      text: "Time is incorrectly formatted"
    }]));

  },

  async success(req, res) {

    const { name, id, time, message } = req.body.data;

    await rsvpsCol().insertOne(newRSVP({
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
      time: readTime(time),
      message
    }));

    res.json({});

  }

});

//rsvp dismiss

const rsvpDismiss = handleAPICall({

  async failure(req, res) {

    const { id } = req.body.data;

    const { user } = await rsvpsCol().findOne({ id });

    const friends = await friendIDList(user.id);

    handleAuthFail(req, res, (id) => !friends.includes(id));

  },

  async success(req, res) {

    const { id } = req.body.data;

    await rsvpsCol().updateOne({ id }, { $addToSet: { hidden: req.user.id } });

    res.json({});

  }

});

//rsvp get list

const rsvpGetList = async (req, res) => {

  const rsvps = !req.user ? [] : await (async () => {

    const friends = await friendIDList(req.user.id);

    return rsvpsCol()
      .find({
        "user.id": { $in: friends },
        "hidden": { $ne: req.user.id }
      })
      .sort({ date: -1 })
      .toArray();

  })();

  res.json({ notifications: { rsvps } });

};

//rsvp remove

const rsvpRemove = handleAPICall({

  async failure(req, res) {

    const { id } = JSON.parse(req.query.data);

    const { user } = await rsvpsCol().findOne({ id });

    handleAuthFail(req, res, (id) => id !== user.id);

  },

  async success(req, res) {

    const { id } = JSON.parse(req.query.data);

    await rsvpsCol().deleteOne({ id });

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
