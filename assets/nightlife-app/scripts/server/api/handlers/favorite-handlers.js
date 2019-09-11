"use strict";

//local imports

const { newFavorite } = require("../../../../schemas");

//global imports

const { handleAPICall, handleAuthFail } = require("redux/server-utils");

//node modules

const uuid = require("uuid/v1");

//utilities

const favoritesCol = () => db.collection("nightlife-app/favorites");

//favorite add

const favoriteAdd = handleAPICall({

  failure: handleAuthFail,

  async success(req, res) {

    const { name, id } = req.body.data;

    await favoritesCol().insertOne(newFavorite({
      id: uuid(),
      user: {
        name: req.user.name,
        id: req.user.id
      },
      venue: {
        name,
        id
      }
    }));

    res.json({});

  }

});

//favorite remove

const favoriteRemove = handleAPICall({

  async failure(req, res) {

    const { id } = JSON.parse(req.query.data);

    const { user } = await favoritesCol().findOne({ id });

    handleAuthFail(req, res, (id) => id !== user.id);

  },

  async success(req, res) {

    const { id } = JSON.parse(req.query.data);

    await favoritesCol().deleteOne({ id });

    res.json({});

  }

});

//exports

module.exports = {
  favoriteAdd,
  favoriteRemove
};
