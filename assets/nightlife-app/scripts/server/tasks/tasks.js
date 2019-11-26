"use strict";

//global imports

const { hourly } = require("redux/server-utils");

//utilities

const friendsCol = () => db.collection("nightlife-app/friends");
const rsvpsCol = () => db.collection("nightlife-app/rsvps");

//tasks

const deleteOldRSVP = () => hourly(() => {

  const dayOld = Date.now() - 24 * 60 * 60 * 1000;

  rsvpsCol().deleteMany({ date: { $lte: dayOld } });

});

const deleteOldRequest = () => hourly(() => {

  const monthOld = Date.now() - 30 * 24 * 60 * 60 * 1000;

  friendsCol().deleteMany({
    date: { $lte: monthOld },
    confirmed: false
  });

});

const tasks = () => {
  deleteOldRSVP();
  deleteOldRequest();
};

//exports

module.exports = tasks;
