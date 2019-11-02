"use strict";

//local imports

const { geoCode } = require("../../app-logic");
const { newUserData, newUserWithData } = require("../../../../schemas");

//global imports

const { deepCopy } = require("all/utilities");
const { handleAPICall, handleAuthFail } = require("redux/server-utils");

//utilities

const userDataCol = () => db.collection("nightlife-app/user-data");

//meta get user

const metaGetUser = async (req, res) => {
  res.json({
    user: req.user ? await (async () => {

      const { value: user } = await userDataCol().findOneAndUpdate({
        id: req.user.id
      }, {
        $setOnInsert: newUserData({
          name: req.user.name,
          id: req.user.id
        })
      }, {
        upsert: true,
        returnNewDocument: true
      });

      return newUserWithData(req.user, user);

    })() : {}
  });
};

//meta save address

const metaSaveAddress = handleAPICall({

  failure: handleAuthFail,

  async success(req, res) {

    const { address, location } = req.body.data;

    const { lib: { geoCode } } = metaSaveAddress.injected;

    await userDataCol().updateOne({ id: req.user.id }, deepCopy({
      $set: {
        "data.address": address,
        "data.location": address ? await geoCode(address) : location
      }
    }));

    res.json({});

  }

});

metaSaveAddress.injected = { lib: { geoCode } };

//meta save avatar

const metaSaveAvatar = handleAPICall({

  failure: handleAuthFail,

  async success(req, res) {

    const { avatar } = req.body.data;

    await userDataCol().updateOne({ id: req.user.id }, { $set: { "data.avatar": avatar } });

    res.json({});

  }

});

//exports

module.exports = {
  metaGetUser,
  metaSaveAddress,
  metaSaveAvatar
};
