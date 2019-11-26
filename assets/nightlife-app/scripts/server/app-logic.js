"use strict";

//local imports

const { newGeoPoint, newVenue, newYelpParams } = require("../../schemas");

//global imports

const { checkErrors, roundTo } = require("all/utilities");
const { handleAuthFail } = require("redux/server-utils");
const { initMockAPICall } = require("redux/tests/server-tests");

//node modules

const chrono = require("chrono-node");
const dateFormat = require("dateformat");
const haversine = require("haversine");
const round = require("mongo-round");
const NodeCache = require("node-cache");
const request = require("request-promise-native");

//utilities

const favoritesCol = () => db.collection("nightlife-app/favorites");
const friendsCol = () => db.collection("nightlife-app/friends");
const rsvpsCol = () => db.collection("nightlife-app/rsvps");
const userDataCol = () => db.collection("nightlife-app/user-data");

//bot api call

const botAPICall = (fn, method) => initMockAPICall(fn, method, (fn) => { //shameless hack

  const wrapper = (...args) => {

    wrapper.mock.calls.push(args);

    return fn(args);

  };

  Object.assign(wrapper, { mock: { calls: [] } });

  return wrapper;

});

//check search

const checkSearch = (params) => checkErrors([{
  bool: params.range < 5 || params.range > 25,
  text: "Range is out of bounds"
}, {
  bool: params.search.length > 100,
  text: "Search exceeds character limit"
}]);

//friend id list

const friendIDList = async (id) => {

  const data = await friendsCol()
    .aggregate([{
      $match: {
        $and: [
          { $or: [{ "from.id": id }, { "to.id": id }] },
          { confirmed: true }
        ]
      }
    }, {
      $group: {
        _id: null,
        friends: {
          $push: {
            $cond: {
              if: { $eq: ["$from.id", id] },
              then: "$to.id",
              else: "$from.id"
            }
          }
        }
      }
    }])
    .next();

  return (data ? data.friends : []).concat(id);

};

//find user item / find user list

const aggDistUser = async (location, max = Infinity) => {

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

const aggListUser = async (user, id) => {

  const list = await friendIDList(id);

  if (!user || !list.includes(user.id)) {
    return [];
  }

  return [{
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

};

const findUserItem = async (user, id, location) => {

  const [dist, list] = await Promise.all([
    aggDistUser(location),
    aggListUser(user, id)
  ]);

  const [item] = await userDataCol()
    .aggregate([...dist, { $match: { id } }, ...list])
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
    .aggregate([...await aggDistUser(location, range), { $match }, { $sort }])
    .skip(length)
    .limit(50)
    .toArray();

};

//find venue item / find venue list

const addDistVenue = (item, location) => {

  const { coordinates: [lon, lat] } = location;

  const coordinates = {
    latitude: lat,
    longitude: lon
  };

  const distance = roundTo(haversine(coordinates, item.coordinates, { unit: "mile" }), 1);

  return { distance };

};

const addListVenue = async (item, user) => {

  if (!user) {
    return [];
  }

  const friends = await friendIDList(user.id);

  return {
    favorites: await favoritesCol()
      .find({
        "user.id": { $in: friends },
        "venue.id": item.id
      })
      .toArray(),
    rsvps: await rsvpsCol()
      .find({
        "user.id": { $in: friends },
        "venue.id": item.id
      })
      .toArray()
  };

};

const findVenueItem = async (handler, user, id, location) => {

  const item = await handler(id);

  return item && newVenue(item, addDistVenue(item, location), await addListVenue(item, user));

};

const findVenueList = async (handler, params, length, location) => {

  const { range, search, sort } = params;
  const { coordinates: [lon, lat] } = location;

  const list = await handler(null, newYelpParams({
    latitude: lat,
    longitude: lon,
    offset: length,
    radius: Math.min(range * 1609, 40000), //miles to meters
    sort_by: sort,
    term: search
  }));

  return list.map((e) => newVenue(e, addDistVenue(e, location)));

};

//geo code

const geoCode = async (address) => {
  try {

    if (address) {

      const res = await request(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.replace(/\s/g, "+")}&key=${process.env.API_GC_KEY_2}`);

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

//handle yelp api

const [cacheA, cacheB] = ((options) => [new NodeCache(options), new NodeCache(options)])({
  stdTTL: 86400, //seconds
  checkperiod: 3600,
  useClones: false
});

const handleYelpAPI = async (id, params) => {
  try {

    const headers = { Authorization: `Bearer ${process.env.API_YP_KEY}` };

    const key = id || JSON.stringify(params);

    const getJSON = (cache, fetch) => cache.get(key) || (async (data = fetch()) => {

      cache.set(key, await data);

      return data;

    })();

    return id
      ? await getJSON(cacheA, async () => JSON.parse(await request({
        headers,
        uri: `https://api.yelp.com/v3/businesses/${id}`
      })))
      : await getJSON(cacheB, async () => {

        const { businesses: list } = JSON.parse(await request({
          headers,
          qs: params,
          uri: "https://api.yelp.com/v3/businesses/search"
        }));

        return list;

      });

  } catch {
    return id ? null : [];
  }
};

//read time

const readTime = (time) => ((date = chrono.strict.parseDate(time)) => date && dateFormat(date, "h:MM TT"))();

//exports

module.exports = {
  botAPICall,
  checkSearch,
  findUserItem,
  findUserList,
  findVenueItem,
  findVenueList,
  friendIDList,
  geoCode,
  handleAuthFriend,
  handleYelpAPI,
  readTime
};
