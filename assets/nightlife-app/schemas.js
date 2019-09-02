"use strict";

//global imports

const { deepCopy } = require("all/utilities");
const { initSchema, listReplacer, newError, newUser } = require("redux/schemas");

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

//new list params users

const newListParamsUsers = initSchema({
  name: "",
  zipCode: ""
});

//new list params venues

const newListParamsVenues = initSchema({
  range: 5,
  search: "",
  sort: "match"
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
  data: {
    nightlifeApp: {
      avatar: "",
      zipCode: "",
      auto: false,
      blocks: []
    }
  }
});

//new user with data

const newUserWithData = initSchema(deepCopy(newUser(), newUserData()));

//new venue

const newOpen = initSchema({
  day: 0,
  end: "",
  start: ""
});

const newHours = initSchema({ open: [] }, { open: listReplacer(newOpen) });

const newVenue = initSchema({ //uses the yelp api

  //list

  alias: "",
  distance: 0,
  image_url: "",
  location: { display_address: [] },
  name: "",
  rating: 0,

  //view

  display_phone: "",
  hours: [],
  is_closed: false,
  url: ""

}, {
  hours: listReplacer(newHours)
});

//new state

const newState = initSchema({

  //meta

  user: {},
  account: {
    settings: false,
    avatar: "",
    zipCode: "",
    delete: false
  },
  errors: [],
  loading: false,

  //data

  meta: {
    favorites: [],
    friends: [],
    rsvps: []
  },

  page: {
    users: [],
    venues: []
  },

  //page

  users: {
    list: {
      name: "",
      zipCode: ""
    }
  },

  venues: {
    list: { search: "" },
    view: {
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

  meta: {
    favorites: listReplacer(newFavorite),
    friends: listReplacer(newFriend),
    rsvps: listReplacer(newRSVP)
  },

  page: {
    users: listReplacer(newUserWithData),
    venues: listReplacer(newVenue)
  }

});

//exports

module.exports = {
  newFavorite,
  newFriend,
  newListParamsUsers,
  newListParamsVenues,
  newRSVP,
  newState,
  newUserData,
  newUserWithData,
  newVenue
};
