"use strict";

//local imports

const { newFavorite } = require("../../../../schemas");

//global imports

const { authFail } = require("redux/server-utils");

//node modules

const uuid = require("uuid/v1");

//utilities

const favoritesCol = () => db.collection("nightlife-app/favorites");

//favorite add

const favoriteAdd = async (req, res) => {

  if (authFail(req, res)) {
    return;
  }

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

};

//favorite remove

const favoriteRemove = async (req, res) => {

  const { id } = JSON.parse(req.query.data);

  const { user } = await favoritesCol().findOne({ id });

  if (authFail(req, res, (id) => id !== user.id)) {
    return;
  }

  await favoritesCol().deleteOne({ id });

  res.json({});

};

//exports

module.exports = {
  favoriteAdd,
  favoriteRemove
};
