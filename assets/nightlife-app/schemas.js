"use strict";

//global imports

const { copySchema, initSchema, listReplacer, newError, newUser } = require("redux/schemas");

//new favorite

const newFavorite = initSchema({
  id: "",
  user: {
    name: "",
    id: ""
  },
  venue: {
    name: "",
    id: ""
  }
});

//new friend

const newFriend = initSchema({
  id: "",
  date: 0,
  from: {
    name: "",
    id: ""
  },
  to: {
    name: "",
    id: ""
  },
  confirmed: false,
  hidden: []
});

//new geo point

const newGeoPoint = initSchema({
  type: "Point",
  coordinates: [] //longitude first
});

//new list params users

const newListParamsUsers = initSchema({
  range: 5,
  search: ""
});

//new list params venues

const newListParamsVenues = initSchema({
  range: 5,
  search: "",
  sort: "best_match"
});

//new rsvp

const newRSVP = initSchema({
  id: "",
  date: 0,
  user: {
    name: "",
    id: ""
  },
  venue: {
    name: "",
    id: ""
  },
  time: "",
  message: "",
  hidden: []
});

//new user data

const newUserData = initSchema({

  name: "",
  id: "",

  data: {

    app: "nightlife-app",

    avatar: "",
    location: null,
    distance: 0, //computed
    blocks: [],

    favorites: [], //computed
    friends: [] //computed

  }

}, {
  data: {

    location: newGeoPoint,

    favorites: listReplacer(newFavorite),
    friends: listReplacer(newFriend)

  }
});

//new user with data

const newUserWithData = copySchema(newUser, newUserData);

//new venue

const newOpen = initSchema({
  day: 0,
  end: "",
  start: ""
});

const newHours = initSchema({ open: [] }, { open: listReplacer(newOpen) });

const newVenue = initSchema({ //uses the yelp api

  //both

  coordinates: {
    latitude: 0,
    longitude: 0
  },
  id: "",
  name: "",
  rating: 0,

  distance: 0, //computed

  //list

  image_url: "",

  //page

  display_phone: "",
  hours: [],
  is_closed: false,
  location: { display_address: [] },
  photos: [],
  url: "",

  favorites: [] //computed

}, {

  hours: listReplacer(newHours),

  favorites: listReplacer(newFavorite)

});

//new state

const newState = initSchema({

  //meta

  user: {},
  account: {
    settings: false,
    avatar: "",
    address: "",
    delete: false
  },
  errors: [],
  loading: false,

  //data

  data: {
    users: [],
    venues: []
  },

  notifications: {
    friends: [],
    rsvps: []
  },

  //view

  users: { list: { search: "" } },

  venues: {
    list: { search: "" },
    page: {
      form: false,
      time: "",
      message: ""
    }
  }

}, {

  user(val) {
    return val.type === "auth" ? newUserWithData(val) : {};
  },

  errors: listReplacer(newError),

  notifications: {
    friends: listReplacer(newFriend),
    rsvps: listReplacer(newRSVP)
  },

  page: {
    users: listReplacer(newUserData),
    venues: listReplacer(newVenue)
  }

});

//new yelp params

const newYelpParams = initSchema({
  latitude: 0,
  limit: 50,
  longitude: 0,
  offset: 0,
  radius: 8045,
  sort_by: "best_match",
  term: ""
});

//exports

module.exports = {
  newFavorite,
  newFriend,
  newGeoPoint,
  newListParamsUsers,
  newListParamsVenues,
  newRSVP,
  newState,
  newUserData,
  newUserWithData,
  newVenue,
  newYelpParams
};
