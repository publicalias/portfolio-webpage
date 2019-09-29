"use strict";

//local imports

const { handleAuthFriend } = require("../../app-logic");
const { newFriend } = require("../../../../schemas");

//global imports

const { checkErrors } = require("all/utilities");
const { handleAPICall, handleAuthFail, handleErrors } = require("redux/server-utils");

//node modules

const uuid = require("uuid/v1");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");
const userDataCol = () => db.collection("nightlife-app/user-data");

//friend add

const friendAdd = handleAPICall({

  async failure(req, res) {

    const { id } = req.body.data;

    const { data: { blocks } } = await userDataCol().findOne({ id });

    handleAuthFail(req, res, (id) => blocks.includes(id));

  },

  async errors(req, res) {

    const { id } = req.body.data;

    const exists = await friendsCol().findOne({
      $or: [{
        "from.id": req.user.id,
        "to.id": id
      }, {
        "from.id": id,
        "to.id": req.user.id
      }]
    });

    handleErrors(res, checkErrors([{
      bool: exists,
      text: "Friend request already exists"
    }]));

  },

  async success(req, res) {

    const { name, id } = req.body.data;

    await friendsCol().insertOne(newFriend({
      id: uuid(),
      date: Date.now(),
      from: {
        name: req.user.name,
        id: req.user.id
      },
      to: {
        name,
        id
      }
    }));

    res.json({});

  }

});

//friend confirm

const friendConfirm = handleAPICall({

  failure: handleAuthFriend(false, true),

  async success(req, res) {

    const { id } = req.body.data;

    await friendsCol().updateOne({ id }, { $set: { confirmed: true } });

    res.json({});

  }

});

//friend dismiss

const friendDismiss = handleAPICall({

  failure: handleAuthFriend(true, true),

  async success(req, res) {

    const { id } = req.body.data;

    await friendsCol().updateOne({ id }, { $addToSet: { hidden: req.user.id } });

    res.json({});

  }

});

//friend get list

const friendGetList = handleAPICall({

  failure: handleAuthFail,

  async success(req, res) {

    const friends = await friendsCol()
      .find({
        $and: [
          { $or: [{ "from.id": req.user.id }, { "to.id": req.user.id }] },
          { hidden: { $ne: req.user.id } }
        ]
      })
      .sort({ date: -1 })
      .toArray();

    res.json({ notifications: { friends } });

  }

});

//friend remove

const friendRemove = handleAPICall({

  failure: handleAuthFriend(true, true),

  async success(req, res) {

    const { id } = JSON.parse(req.query.data);

    await friendsCol().deleteOne({ id });

    res.json({});

  }

});

//exports

module.exports = {
  friendAdd,
  friendConfirm,
  friendDismiss,
  friendGetList,
  friendRemove
};
