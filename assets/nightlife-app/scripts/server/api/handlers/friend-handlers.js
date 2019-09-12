"use strict";

//local imports

const { handleAuthFriend } = require("../../app-logic");
const { newFriend } = require("../../../../schemas");

//global imports

const { handleAPICall, handleAuthFail } = require("redux/server-utils");

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

  async success(req, res) {

    const { name, id } = req.body.data;

    await friendsCol().createIndex({
      "from.id": 1,
      "to.id": 1
    }, {
      unique: true
    });

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
