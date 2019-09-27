"use strict";

//local imports

const { newGeoPoint } = require("../../schemas");

//global imports

const { handleAuthFail } = require("redux/server-utils");

//node modules

const round = require("mongo-round");
const request = require("request-promise-native");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");
const userDataCol = () => db.collection("nightlife-app/user-data");

//find user item / find user list

const addDistance = async (location, max = Infinity) => {

  await userDataCol().createIndex({ "data.location": "2dsphere" });

  const field = "data.distance";

  return [{
    $geoNear: {
      near: location,
      distanceField: field,
      maxDistance: max * 1609, //miles to meters
      distanceMultiplier: 1 / 1609, //meters to miles
      limit: 1000
    }
  }, {
    $addFields: {
      [field]: round(`$${field}`, 1) //no $round
    }
  }];

};

const addLists = (user) => {

  if (!user) {
    return [];
  }

  const lists = [{
    $lookup: {
      from: "nightlife-app/favorites",
      localField: "id",
      foreignField: "user.id",
      as: "data.favorites"
    }
  }, {
    $lookup: {
      from: "nightlife-app/friends",
      let: { id: "$id" },
      pipeline: [{
        $match: {
          $and: [
            { $expr: { $or: [{ $eq: ["$from.id", "$$id"] }, { $eq: ["$to.id", "$$id"] }] } },
            { confirmed: true }
          ]
        }
      }],
      as: "data.friends"
    }
  }];

  const filter = (prop) => [{
    $addFields: {
      [`data.${prop}`]: {
        $cond: {
          if: {
            $or: [
              { $eq: [user.id, "$id"] },
              { $in: [user.id, "$data.friends.from.id"] },
              { $in: [user.id, "$data.friends.to.id"] }
            ]
          },
          then: `$data.${prop}`,
          else: []
        }
      }
    }
  }];

  return lists.concat(filter("favorites"), filter("friends"));

};

const findUserItem = async (user, id, location) => {

  const [item] = await userDataCol()
    .aggregate([...await addDistance(location), { $match: { id } }, ...addLists(user)])
    .toArray();

  return item;

};

const findUserList = async (params, length, location) => {

  const { range, search } = params;

  const $match = search ? {
    name: {
      $regex: search,
      $options: "i"
    }
  } : {};

  const $sort = {
    "data.distance": -1,
    "_id": 1 //ensures consistency in tests
  };

  return userDataCol()
    .aggregate([...await addDistance(location, range), { $match }, { $sort }])
    .skip(length)
    .limit(50)
    .toArray();

};

//geo code

const geoCode = async (address) => {
  try {

    if (address) {

      const res = await request(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.replace(/\s/gu, "+")}&key=${process.env.API_GC_KEY_2}`);

      const { lat, lng } = JSON.parse(res).results[0].geometry.location;

      return newGeoPoint({ coordinates: [lng, lat] });

    }

    return null;

  } catch {
    return null;
  }
};

//handle auth friend

const handleAuthFriend = (allowFrom, allowTo) => async (req, res) => {

  const { id } = req.body.data || JSON.parse(req.query.data);

  const { from, to } = await friendsCol().findOne({ id });

  handleAuthFail(req, res, (id) => {

    if (allowFrom && allowTo) {
      return id !== from.id && id !== to.id;
    } else if (allowFrom) {
      return id !== from.id;
    }

    return id !== to.id;

  });

};

//exports

module.exports = {
  findUserItem,
  findUserList,
  geoCode,
  handleAuthFriend
};
